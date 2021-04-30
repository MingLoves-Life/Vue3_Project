import { createStore } from "vuex";

const store = createStore({
  state: () => {
    return {
      collapse: false,
    };
  },
  mutations: {
    handleCollapse(state, payload) {
      state.collapse = payload.collapse;
    },
  },
});

export default store;
