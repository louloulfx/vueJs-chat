import Vue from "vue";
import Router from "vue-router";
import Login from "../components/Login";
import Register from "../components/Register";
import Chart from "../components/ChatScreen";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/chat",
      name: "chat",
      component: Chart,
      props: true,
    },
  ],
});

export default router;
