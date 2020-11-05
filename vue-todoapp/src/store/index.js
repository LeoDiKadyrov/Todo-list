import { createStore } from 'vuex'

export default createStore({
  state: {
    lists: [],
    isVisible: false
  },
  mutations: {
    addNewList(state, newList) {
      state.lists.push(newList);
    },
    addSublist(state) {
      state.isVisible = true;
    }
  },
  actions: {
    addNewList({ commit }, newList) {
      commit("addNewList", newList);
    }
  },
  getters: {
    GET_LIST(state) {
      return state.lists;
    }
  }
})
