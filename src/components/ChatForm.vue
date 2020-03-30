<template>
  <div id="chat">
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
</template>
<script>
const ws = new WebSocket("wss://backend.cleverapps.io");
export default {
  data() {
    return { messageList: [] };
  },
  created() {
    var token = this.$route.params.token;
    ws.send(token);
  },
  mounted() {
    if (this.$route.params.token === undefined) {
      this.$router.push({ name: "login" });
    }
    let messages = [];
    ws.onmessage = function(msg) {
      messages.push({ text: msg.data });
    };
    this.messageList = messages;
  },
  methods: {
    chat: function(e) {
      e.preventDefault();
      var input = document.getElementById("input");
      var text = input.value;
      ws.send(text);
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
