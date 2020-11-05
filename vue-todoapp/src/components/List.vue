<template>
    <div class="list">
        <div class="w">
            <div class="list__listings" v-for="list in GET_LIST" :key="list.id">
                <router-link to="{ name: 'list', params: { listId: list.id }}" @click="addSublist" class="list__item">{{ list.content }}</router-link>
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
//import Sublist from "./Sublist.vue"
export default {
    data() {
        return {
            newList: '',
        }
    },
    components: {
        //Sublist
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
        addSublist() {

        }
    }
}
</script>