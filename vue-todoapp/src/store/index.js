import { createStore } from 'vuex'

export default createStore({
  state: {
    lists: [],
  },
  mutations: {
    addNewList(state, newList) {
      state.lists.push(newList);
    },
    removeList(index) {
      this.lists.value.splice(index, 1);
    }
  },
  actions: {
    addNewList({ commit }, newList) {
      commit("addNewList", newList);
    },
    removeList({ commit }, index) {
      commit("addNewList", index);
    }
  },
  getters: {
    GET_LIST(state) {
      return state.lists;
    }
  }
})
