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
  </div>
</template>
<script>
export default {
  data() {
    return { messageList: [] };
  }
  //   mounted() {
  //     var chatform = document.querySelector(".chatform");
  //     chatform.onsubmit = function(e) {
  //       e.preventDefault();
  //       var input = document.getElementById("input");
  //       var text = input.value;
  //       this.ws.send(text);
  //       console.log("sending: " + text);
  //       input.value = "";
  //       input.focus();
  //       return false;
  //     };
  //     this.ws.onmessage = function(msg) {
  //       console.log("received: " + msg);
  //       var response = msg.data;
  //       var messageList = document.querySelector(".messages");
  //       var li = document.createElement("li");
  //       li.textContent = response;
  //       messageList.appendChild(li);
  //     };
  //   },
};
</script>
