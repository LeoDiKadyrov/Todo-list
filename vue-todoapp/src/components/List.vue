<template>
    <div class="list">
        <div class="w">
            <div class="list__listings" v-for="(list, index) in GET_LIST" :key="list.id">
              <span id="list-remove" @click="removeList(index)">[x]</span>  <router-link to="{ '/list/' + list.id }" v-bind="to" class="list__item" append>{{ list.content }}</router-link>
            </div>
        </div>

        <div class="list__create">
            <input @keypress="inputEnter" maxlength="30" v-model.trim="newList" type="text" placeholder="Введите название списка" id="add-input" />
            <button id="add-button" @click.prevent="addNewList">Добавить список</button>
        </div>
    </div>
    <router-view></router-view>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            newList: '',
        }
    },
    computed: {
        ...mapGetters([
            "GET_LIST"
        ])
    },
    methods: {
        addNewList() {
            const newList = {
                id: Date.now(),
                done: false,
                content: this.newList
            }
            if (newList.content) {
                this.$store.dispatch("addNewList", newList)
            } else { return; }
            this.newList = ""
        },
        inputEnter() {
            if (event.keyCode === 13) {
                this.addNewList();
            }
        },
        removeList(index) {
            this.$store.dispatch("removeList", index)
        }
    }
}
</script>

/* to-do
1. fix the bug with unique id in url
2. fix the bug with removing the list
3. make creation of subtasks possible
4. make the logic of emergency checkbox
 */