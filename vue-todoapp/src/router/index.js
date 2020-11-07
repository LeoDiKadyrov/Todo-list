import { createRouter, createWebHistory } from 'vue-router'
import Sublist from "../components/Sublist.vue"
import List from "../components/List.vue"

const routes = [
  {
    path: "/sublist",
    name: "Sublist",
    component: Sublist
  },
  {
    path: "/",
    name: "home",
    component: List
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
