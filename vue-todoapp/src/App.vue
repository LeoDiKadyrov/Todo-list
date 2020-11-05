<template>
<h1 class="app__title">Todo App</h1>
  <div id="app-wrapper">
    <List></List>
  </div>
</template>

<script>
import "./assets/style.css"
import List from "./components/List.vue"
export default {
  components: {
    List,
  }
}
</script>
