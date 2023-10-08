<template>
  <div class="form-box">
    <form class="form" @submit.prevent>
      <label class="form__label">Введите цитату</label>
      <textarea ref="note"></textarea>
      <ButtonWithText @click="saveQuote(selectedBook.id)">
        Сохранить
      </ButtonWithText>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "QuoteFormComponent",
  computed: {
    ...mapState({
      selectedBook: (state) => state.list.selectedBook,
    }),
  },
  methods: {
    ...mapMutations({
      setModalStatus: "setModalStatus",
    }),
    ...mapActions({
      updateData: "list/updateData",
    }),

    async saveQuote(id) {
      await axios
        .patch(`http://localhost:3000/api/books/${id}`, {
          quotes: [
            ...this.selectedBook.quotes,
            {
              number: Date.now(),
              value: this.$refs.note.value,
            },
          ],
        })
        .then(() => this.$emit("update", this.$refs.note.value))
        .catch((err) => {throw new Error('Ошибка при сохранении цитаты из книги')});
      this.updateData();
      this.setModalStatus();
    },
  },
};
</script>
