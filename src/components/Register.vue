<template>
  <div>
    <registerForm></registerForm>
  </div>
</template>

<script>
import registerForm from "./RegisterForm";
export default {
  name: "Register",
  components: {
    registerForm
  },
  created() {
    document.title = "Web-Socket /register";
  }
};
</script>