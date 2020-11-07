<template>
    <div class="list">
        <div class="w">
            <div class="list__listings" @click="$store.commit('chooseIndex', index)" v-for="(list, index) in GET_LIST" :key="index">
              <span id="list-remove" @click="removeList(index)">[x]</span>  
              <router-link to="/sublist" v-bind="to" class="list__item">{{ list.content }}</router-link>
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
            "GET_LIST",
            "GET_INDEX"
        ])
    },
    methods: {
        addNewList() {
            const newList = {
                done: false,
                content: this.newList,
                subtask: []
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
            this.$store.dispatch("removeList", index);
        }
    }
}
</script>

/* to-do
1. messagebox when create and delete the tasks
2. if user doesn't wanna delete (clicks cancel on messagebox), send him on home page
3. filter for lists (done, undone)
4. talk to backender
5. styles 
 */