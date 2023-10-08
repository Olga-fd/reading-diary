import { createStore } from "vuex";
import { listModule } from "./listModule";

export default createStore({
  state: () => ({
    modalVisible: false,
    currentSlide: 'plot',
    loader: true,
    theme: "dark",
  }),
  getters: {
    getModalStatus: state => state.modalVisible
  },
  mutations: {
    setModalStatus(state) {
      state.modalVisible = !state.modalVisible;
    },
    setTheme(state) {
      state.theme = state.theme == "dark" ? "light" : "dark";
    },
    setCurrentSlide(state, payload) {
      const allowedStates = ['plot', 'quote', 'resume'];
      if (allowedStates.includes(payload)) {
        state.currentSlide = payload;
      } else {
        console.error('Недопустимое состояние слайда');
      }
    }
  },
  actions: {
    showLoader(state) {
      setTimeout(() => {
        state.loader = false;
      }, 1000);
    },
  },
  modules: {
    list: listModule,
  },
});
