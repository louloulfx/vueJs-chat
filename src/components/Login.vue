<template>
  <div>
    <loginForm></loginForm>
  </div>
</template>

<script>
import loginForm from "./LoginForm";
export default {
  name: "Login",
  components: {
    loginForm
  },
  created() {
    document.title = "Web-Socket /login";
  }
};
</script>
