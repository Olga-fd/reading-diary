<template>
  <ButtonWithText @click="showModal" key="quote-write">
    Добавить цитату
  </ButtonWithText>
  <ModalComponent />
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "BtnWithModalQuote",
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
      this.setCurrentSlide('quote')
    },
  },
};
</script>
