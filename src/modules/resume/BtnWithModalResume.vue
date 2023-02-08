<template>
  <ButtonWithText
    v-if="selectedBook.review === ''"
    @click="showModal"
    key="resume-write"
  >
    Написать
  </ButtonWithText>
  <ButtonWithText v-else @click="showModal" key="resume-edit"
    >Редактировать</ButtonWithText
  >
  <ModalComponent v-model:show="modalVisible" v-if="modalVisibleResume">
    <ResumeFormComponent />
    <!-- <ResumeFormComponent v-if="selectedBook.review" />
    <FormComponent v-else /> -->
  </ModalComponent>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import ResumeFormComponent from "./ResumeFormComponent.vue";
export default {
  name: "BtnWithModalResume",
  data() {
    return {
      modalVisible: false,
    };
  },
  components: { ResumeFormComponent },
  computed: {
    ...mapState({
      modalVisibleResume: (state) => state.modalVisibleResume,
      selectedBook: (state) => state.list.selectedBook,
    }),
  },
  methods: {
    ...mapMutations({
      setResumeModalStatus: "setResumeModalStatus",
    }),
    showModal() {
      this.setResumeModalStatus();
      this.modalVisible = true;
    },
  },
};
</script>

<style scoped></style>
