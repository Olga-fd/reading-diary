<template>
  <ButtonWithText v-if="idOfBook === ''" @click="showModal">
    Написать
  </ButtonWithText>
  <ButtonWithText v-else @click="showModal">Редактировать</ButtonWithText>
  <ModalComponent v-model:show="modalVisible">
    <PlotFormComponent v-if="section === 'plot'" />
    <FormComponent v-else />
  </ModalComponent>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "BtnWithModal",
  data() {
    return {
      modalVisible: false,
    };
  },

  components: {},
  computed: {
    ...mapState({
      books: (state) => state.list.books,
      idOfBook: (state) => state.list.idOfBook,
      section: (state) => state.section,
    }),
  },
  methods: {
    showModal() {
      this.modalVisible = true;
    },
  },
};
</script>

<style scoped></style>