import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Upload from "@/views/Upload.vue";
import Login from "@/views/Login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/upload",
      name: "upload",
      component: Upload,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    }
  ],
});

// Navigation Guard
router.beforeEach(async (to, from) => {
  if (
      !sessionStorage.getItem("token") && to.name !== 'login'
  ) {
    return { name: 'login' }
  }
})


export default router;
