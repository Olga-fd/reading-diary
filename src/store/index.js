import { createStore } from "vuex";
import { plotModule } from "./plotModule";
import { listModule } from "./listModule";

export default createStore({
  state: () => ({
    currentId: 0,
    currentText: "",
    title: JSON.parse(localStorage.numberOfBook).title,
    typeOfModalText: "",
    infoData: [],
    note: "",
  }),
  getters: {},
  mutations: {
    addText(state) {
      // state.infoData[state.currentId][state.typeOfModalText] =
      //   state.currentText;
      state.infoData.push({ id: Date.now(), plotText: state.note });
    },
    addTypeModal(state) {
      state.typeOfModalText = "";
    },
  },
  actions: {},
  modules: {
    plot: plotModule,
    list: listModule,
  },
});
