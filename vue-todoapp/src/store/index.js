import { createStore } from 'vuex'

export default createStore({
  state: {
    lists: [],
    listIndex: 0
  },
  mutations: {
    addNewList(state, newList) {
      state.lists.push(newList);
    },
    addSubtask(state, newSubtask) {
      state.lists[state.listIndex].subtask.push(newSubtask);
    },
    removeList(state, index) {
      state.lists.splice(index, 1);
    },
    removeSubtask(state, index) {
      state.lists[state.listIndex].subtask.splice(index, 1)
    },
    chooseIndex(state, index) {
      state.listIndex = index;
    }
  },
  actions: {
    addNewList({ commit }, newList) {
      commit("addNewList", newList);
    },
    addSubtask({ commit }, index, newSubtask) {
      commit("addSubtask", index, newSubtask);
    },
    removeList({ commit }, index) {
      commit("removeList", index);
    },
    removeSubtask({ commit }, index) {
      commit("removeSubtask", index);
    }
  },
  getters: {
    GET_LIST(state) {
      return state.lists;
    },
    GET_INDEX(state) {
      return state.lists[state.listIndex].subtask;
    }
  }
})
