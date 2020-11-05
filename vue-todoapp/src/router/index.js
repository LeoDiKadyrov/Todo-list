import { createRouter, createWebHistory } from 'vue-router'
// import List from "../components/List.vue"
import Sublist from "../components/Sublist.vue"

const routes = [
  {
    path: "/:listId",
    name: "Sublist",
    component: Sublist
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
