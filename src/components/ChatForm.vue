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
    <div v-on:click="getPosition" class="cadre" id="cadre">
      <div v-for="(user, i) in users" :key="i+1">
        <div
          v-bind:style="'left:' + user.x + 'px;' + 'top:' + user.y +'px;' +'position:absolute;height:50px;width:50px; background: #85D8CE; border: 1px solid black'"
        >{{user.username}}</div>
      </div>
    </div>
  </div>
</template>
<script>
const ws = new WebSocket("wss://backend.cleverapps.io");
export default {
  name: "ChatForm",
  data() {
    return { messageList: [], users: [] };
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
    let users = [];
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

        let userExists = users.some(function(el) {
          return el.username === username;
        });
        if (userExists) {
          let objetIndex = users.findIndex(obj => obj.username === username);
          users[objetIndex].x = moveX;
          users[objetIndex].y = moveY;
        } else {
          users.push({
            username: username,
            x: moveX,
            y: moveY,
            bordercolor: color,
            textcolor: color2,
            background: color3
          });
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
    this.users = users;
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
  height: 500px;
  width: 500px;
}
#chat {
  display: flex;
  flex-direction: row;
}
</style>