<template>
  <div id="chat">
    <div>
      <h2>Chat</h2>
      <form class="chatform" @submit.prevent="chat">
        <input name="message" id="input" />
        <input class="submit" type="submit" />
      </form>
      <ul class="messages" v-for="(message, i) in messageList" :key="i + 1">
        <li>{{ message.text }}</li>
      </ul>
      <button type="submit" v-on:click="logout()">Disconnect</button>
    </div>
    <div v-on:click="getPosition" class="cadre" id="cadre"></div>
  </div>
</template>
<script>
const ws = new WebSocket("wss://backend.cleverapps.io");
export default {
  name: "ChatForm",
  data() {
    return { messageList: [] };
  },
  created() {
    document.title = "Web-Socket /chat";
    var token = this.$route.params.token;
    ws.send(token);
  },
  mounted() {
    if (this.$route.params.token === undefined) {
      this.$router.push({ name: "login" });
    }
    let messages = [];
    ws.onmessage = function(msg) {
      if (msg.data.includes("mov:") === true) {
        var index = msg.data.indexOf(":");
        var index2 = msg.data.indexOf("mov:");
        var username = msg.data.slice(0, index - 1);
        var coordonnate = msg.data.slice(index2 + 4, msg.data.length);
        var x = coordonnate.slice(0, coordonnate.indexOf(","));
        var y = coordonnate.slice(
          coordonnate.indexOf(",") + 1,
          coordonnate.length
        );
        var letters = "0123456789ABCDEF";
        var color = "#";
        var color2 = "#";
        var color3 = "#";
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
          color2 += letters[Math.floor(Math.random() * 16)];
          color3 += letters[Math.floor(Math.random() * 16)];
        }
        var cadre = document.getElementById("cadre");
        var moveX = parseInt(x) + cadre.offsetLeft;
        var moveY = parseInt(y) + cadre.offsetTop;
        var element = document.getElementById(username);
        if (element === null) {
          var newElement = document.createElement(username);
          newElement.style.width = "50px";
          newElement.style.height = "50px";
          newElement.style.position = "absolute";
          newElement.style.border = "1px solid" + color2;
          newElement.style.left = moveX + "px";
          newElement.style.top = moveY + "px";
          newElement.style.color = color;
          newElement.style.background = color3;
          newElement.textContent = username;
          newElement.id = username;
          document.getElementById("cadre").appendChild(newElement);
        } else {
          element.style.width = "50px";
          element.style.height = "50px";
          element.style.position = "absolute";
          element.style.border = "1px solid" + color2;
          element.style.left = moveX + "px";
          element.style.top = moveY + "px";
          element.style.color = color;
          element.style.background = color3;
          element.textContent = username;
          element.id = username;
          document.getElementById("cadre").appendChild(element);
        }
      } else if (msg.data.includes("msg:") === true) {
        var newIndex = msg.data.indexOf("msg:");
        var newUsername = msg.data.slice(0, newIndex - 1);
        var text = newUsername + msg.data.slice(newIndex + 4, msg.data.length);
        messages.push({ text: text });
      } else {
        messages.push({ text: msg.data });
      }
    };
    this.messageList = messages;
  },
  methods: {
    getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    getPosition(event) {
      var cadre = document.getElementById("cadre");
      var y = event.pageY;
      var x = event.pageX;
      var moveX = x - cadre.offsetLeft;
      var moveY = y - cadre.offsetTop;
      ws.send("mov:" + moveX + "," + moveY);
    },
    chat: function(e) {
      e.preventDefault();
      var input = document.getElementById("input");
      var text = input.value;
      ws.send("msg: " + text);
      input.value = "";
      input.focus();
    },
    async logout() {
      const login = this.axios.create({
        withCredentials: true
      });
      await login
        .post("https://backend.cleverapps.io/logout", {
          yes: "yo"
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
          alert("Wrong creditentials");
        });
      location.reload();
    }
  }
};
</script>
<style scoped>
.cadre {
  border: 1px solid black;
  margin-left: 50px;
  height: 700px;
  padding-bottom: -10px;
  width: 1200px;
}
#chat {
  display: flex;
  flex-direction: row;
}
</style>