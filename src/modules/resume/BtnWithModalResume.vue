<template>
  <ButtonWithText
    v-if="selectedBook.review === ''"
    @click="showModal"
    key="resume-write"
  >
    Написать
  </ButtonWithText>
  <ButtonWithText v-else @click="showModal" key="resume-edit">
    Редактировать
  </ButtonWithText>
  <ModalComponent />
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "BtnWithModalResume",
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
      this.setCurrentSlide('resume')
    },
  },
};
</script>
