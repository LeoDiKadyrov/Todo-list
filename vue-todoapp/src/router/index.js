import { createRouter, createWebHistory } from 'vue-router'
import Sublist from "../components/Sublist.vue"

const routes = [
  {
    path: "/:id",
    name: "Sublist",
    component: Sublist
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
