import { createStore } from "vuex";
import { listModule } from "./listModule";

export default createStore({
  state: () => ({
    modalVisible: false,
    modalVisiblePlot: false,
    modalVisibleResume: false,
    modalVisibleQuote: false,
    loader: true,
  }),
  getters: {},
  mutations: {
    setModalStatus(state) {
      state.modalVisible = !state.modalVisible;
    },
    setPlotModalStatus(state) {
      state.modalVisiblePlot = !state.modalVisiblePlot;
    },
    setResumeModalStatus(state) {
      state.modalVisibleResume = !state.modalVisibleResume;
    },
    setQuoteModalStatus(state) {
      state.modalVisibleQuote = !state.modalVisibleQuote;
    },
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
