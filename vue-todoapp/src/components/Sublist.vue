<template>
    <div class="sublist" >
        <div 
            class="sublist__create" 
            :class="{ emergency: task.emergency, sublist__done: task.done }" 
            v-for="(task, index) in GET_INDEX" :key="index"
        >
            <div>
                <input id="sublist-checkbox" type="checkbox" v-model="task.done" @click="task.done = !task.done" />
                <span>{{ task.content }}</span>
            </div>
            <span>{{ task.date }}</span>
            <span id="list-remove" @click="removeSubtask(index)">[x]</span>
            
        </div>
        <div class="list__create">
            <input 
                @keypress="inputEnter" id="sublist-input" 
                type="text" maxlength="30" v-model.trim="newSubtask"
                placeholder="Создайте подзадачу" 
            /><br>
            <input id="sublist-checkbox" type="checkbox" @click="this.emergency = !this.emergency"/>Срочное    
            <button id="add-button" @click="addSubtask()">Создать подзадачу</button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import swal from 'sweetalert';
export default {
    data() {
        return {
            newSubtask: "",
            emergency: false,
            subtaskDone: false
        }
    },
     computed: {
        ...mapGetters([
            "GET_LIST",
            "GET_INDEX"
        ])
    },
    methods: {
        addSubtask() {
            const newSubtask = {
                date: new Date().toLocaleString(),
                done: this.subtaskDone,
                content: this.newSubtask,
                emergency: this.emergency
            }
            if (newSubtask.content) {
                this.$store.dispatch("addSubtask", newSubtask);
            } else { return; }
            this.newSubtask = ""
            swal("Добавлено", "Вы добавили новую подзадачу!", "success");
        },
        inputEnter() {
            if (event.keyCode === 13) {
                this.addSubtask();
            }
        },
        removeSubtask(index) {
            swal({
                title: "Вы уверены?",
                text: "Если вы удалите подзадачу, вы уже не сможете ее вернуть!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
                .then((willDelete) => {
                if (willDelete) {
                    this.$store.dispatch("removeSubtask", index);
                    swal("Подзадача удалена", {
                    icon: "success",
                    });
                } else {
                    swal("Ваша подзадача в безопасности!");
                }
            });
        }
    }
}
</script>