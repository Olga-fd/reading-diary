<template>
  <ButtonWithText @click="showModal" key="quote-write">
    Добавить цитату
  </ButtonWithText>
  <ModalComponent v-model:show="modalVisible" v-if="modalVisibleQuote">
    <QuoteFormComponent />
  </ModalComponent>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import QuoteFormComponent from "./QuoteFormComponent.vue";
export default {
  name: "BtnWithModalQuote",
  data() {
    return {
      modalVisible: false,
    };
  },

  components: { QuoteFormComponent },
  computed: {
    ...mapState({
      modalVisibleQuote: (state) => state.modalVisibleQuote,
      selectedBook: (state) => state.list.selectedBook,
    }),
  },
  methods: {
    ...mapMutations({
      setQuoteModalStatus: "setQuoteModalStatus",
    }),
    showModal() {
      this.setQuoteModalStatus();
      this.modalVisible = true;
    },
  },
};
</script>

<style scoped></style>
