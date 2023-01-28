import { createStore } from "vuex";
import { plotModule } from "./plotModule";
import { listModule } from "./listModule";

export default createStore({
  state: () => ({
    currentId: 0,
    currentText: "",
    typeOfModalText: "",
    infoData: [],
    note: "",
    modalVisible: false,
    loader: true,
    section: "",
  }),
  getters: {},
  mutations: {
    addText(state) {
      // state.infoData[state.currentId][state.typeOfModalText] =
      //   state.currentText;
      state.infoData.push({ id: Date.now(), plotText: state.note });
      state.modalVisible = false;
    },
    addTypeModal(state) {
      state.typeOfModalText = "";
    },
    updateNote(state, note) {
      state.note = note;
    },
    updateSection(state, section) {
      state.section = section;
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
    plot: plotModule,
    list: listModule,
  },
});
