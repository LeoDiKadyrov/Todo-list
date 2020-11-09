<template>
    <div class="list">
        <div id="wrapper">
            <div 
                class="list__listings"
                @click="$store.commit('chooseIndex', index)" 
                v-for="(list, index) in GET_LIST" :key="index"
                :class="{ completed: ifListDone(index)}"
            >
                <div class="list__sublock" @change="ifListDone">
                    <button id="list-remove" @click="removeList(index)">[x]</button>  
                    <router-link to="/sublist" v-bind="to" class="list__item">{{ list.content }}</router-link>
                </div>
            </div>
        </div>

        <div class="list__create">
            <input @keypress="inputEnter" maxlength="30" v-model.trim="newList" type="text" placeholder="Введите название списка" id="add-input" />
            <button id="add-button" @click.prevent="addNewList">Добавить список</button>
            <div class="select__block">
                <select @change="listFilter" v-model="selected" id="filter-todo">
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>
            </div>
        </div>
    </div>
    <router-view></router-view>
</template>

<script>
import { mapGetters } from "vuex";
import swal from 'sweetalert';
export default {
    data() {
        return {
            newList: '',
            listDone: false,
            selected: "all"
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
                done: this.listDone,
                content: this.newList,
                subtask: []
            }
            if (newList.content) {
                this.$store.dispatch("addNewList", newList)
            } else { return; }
            this.newList = ""
            swal("Добавлено", "Вы добавили новый список дел!", "success");
        },
        inputEnter() {
            if (event.keyCode === 13) {
                this.addNewList();
            }
        },
        removeList(index) {
            swal({
                title: "Вы уверены?",
                text: "Если вы удалите список, вы уже не сможете его вернуть!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
                .then((willDelete) => {
                if (willDelete) {
                    this.$store.dispatch("removeList", index);
                    swal("Список удалена", {
                    icon: "success",
                    });
                } else {
                    swal("Ваш список в безопасности!");
                }
            });
        },
        listFilter() {
            const wrapper = document.getElementById("wrapper").childNodes;
            for (let i = 1; i < wrapper.length - 1; i++) {
                switch(this.selected) {
                    case "all":
                        wrapper[i].style.display = "flex";
                        break;
                    case "completed":
                        if (wrapper[i].classList.contains("completed")) {
                            wrapper[i].style.display = "flex";
                        } else { wrapper[i].style.display = "none"; }
                        break;
                    case "uncompleted":
                        if (!wrapper[i].classList.contains("completed")) {
                            wrapper[i].style.display = "flex";
                        } else { wrapper[i].style.display = "none" }
                        break;
                }
            }
        },
        ifListDone(index) {
            let flag = false;
            for (let i = 0; i < this.GET_LIST[index].subtask.length; i++) {
                if (this.GET_LIST[index].subtask[i].done) {
                    flag = true;
                } else { flag = false; }
            }
            return flag;
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