<template>
  <div class="body">
    <div class="container_inscription" id="container_inscription">
      <form name="inscription" class="inscription" @submit.prevent="submit">
        <h1 class="p_inscription">Inscription</h1>
        <hr />
        <label for="username">Username</label>
        <input
          class="input"
          type="text"
          name="username"
          v-model="form.username"
          placeholder="USERNAME"
          required
        />
        <label for="email">Email</label>
        <input
          class="input"
          type="text"
          name="email"
          v-model="form.email"
          placeholder="EMAIL"
          required
        />
        <label for="password">Password</label>
        <input
          class="input"
          type="password"
          name="password"
          v-model="form.password"
          placeholder="PASSWORD"
          required
        />
        <input class="action-button" type="submit" value="REGISTER" />
      </form>
      <router-link class="createAccount2" to="/">
        <button class="createAccount" id="createAccount">
          Se connecter
        </button>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "RegisterForm",
  data() {
    return {
      form: { username: "", email: "", password: "" }
    };
  },
  methods: {
    submit() {
      this.axios
        .post("https://backend.cleverapps.io/subscribe", {
          username: this.form.username,
          email: this.form.email,
          password: this.form.password
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
          alert("username already exist");
        });
    }
  }
};
</script>
<style scoped>
.body {
  font-family: montserrat;
  display: flex;
  flex-direction: column;
}

hr {
  width: 50%;
  margin-bottom: 30px;
  border: 1px solid black;
}
.container_inscription {
  width: 33%;
  margin-top: 100px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  background: #f8f8f8;
  border-radius: 20px;
  border: 1px solid black;
  align-self: center;
}

.inscription {
  display: flex;
  flex-direction: column;
}

.p_inscription {
  text-align: center;
}

.input {
  margin-top: 10px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 20px;
  width: 100%;
  box-sizing: border-box;
  color: #2c3e50;
  font-size: 13px;
}

.action-button {
  width: 250px;
  background: #000;
  font-weight: bold;
  color: white;
  border: 0 none;
  border-radius: 1px;
  cursor: pointer;
  padding: 10px 5px;
  margin: 10px 5px;
  align-self: center;
}

.createAccount {
  margin-top: 5px;
  width: 150px;
  align-self: center;
  background: #000;
  font-weight: bold;
  color: white;
  border: 0 none;
  border-radius: 1px;
  cursor: pointer;
  padding: 10px 5px;
  margin: 10px 5px;
}

.createAccount2 {
  align-self: center;
  cursor: pointer;
}
</style>
