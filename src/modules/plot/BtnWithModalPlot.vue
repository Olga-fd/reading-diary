<template>
  <ButtonWithText
    v-if="selectedBook.plot === ''"
    @click="showModal"
    key="plot-write"
  >
    Написать
  </ButtonWithText>
  <ButtonWithText v-else @click="showModal" key="plot-edit"
    >Редактировать</ButtonWithText
  >
  <ModalComponent v-model:show="modalVisible" v-if="modalVisiblePlot">
    <PlotFormComponent />
    <!-- <PlotFormComponent v-if="selectedBook.plot" />
    <FormComponent v-else /> -->
  </ModalComponent>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import PlotFormComponent from "./PlotFormComponent.vue";

export default {
  name: "BtnWithModalPlot",
  data() {
    return { modalVisible: false };
  },

  components: {
    PlotFormComponent,
  },
  computed: {
    ...mapState({
      modalVisiblePlot: (state) => state.modalVisiblePlot,
      selectedBook: (state) => state.list.selectedBook,
    }),
  },
  methods: {
    ...mapMutations({
      setPlotModalStatus: "setPlotModalStatus",
    }),
    showModal() {
      this.setPlotModalStatus();
      this.modalVisible = true;
    },
  },
};
</script>

<style scoped></style>
