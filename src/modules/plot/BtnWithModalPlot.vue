<template>
  <ButtonWithText
    v-if="selectedBook.plot === ''"
    @click="showModal"
    key="plot-write"
  >
    Написать
  </ButtonWithText>
  <ButtonWithText v-else @click="showModal" key="plot-edit">
    Редактировать
  </ButtonWithText>
  <ModalComponent />
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "BtnWithModalPlot",
  computed: {
    ...mapState({
      selectedBook: (state) => state.list.selectedBook,
    }),
  },
  methods: {
    ...mapMutations({
      setModalStatus: "setModalStatus",
      setCurrentSlide: "setCurrentSlide",
    }),
    showModal() {
      this.setModalStatus();
      this.setCurrentSlide('plot')
    },
  },
};
</script>
