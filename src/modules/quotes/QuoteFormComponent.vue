<template>
  <div class="form-box">
    <form class="form" @submit.prevent>
      <label>Введите цитату</label>
      <textarea
        ref="note"
        :value="selectedBook.quotes.length ? selectedBook.quotes[0].value : ''"
      ></textarea>
      <ButtonWithText @click="saveQuote(selectedBook.id)">
        Сохранить
      </ButtonWithText>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "QuoteFormComponent",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      selectedBook: (state) => state.list.selectedBook,
    }),
    ...mapGetters({}),
  },
  methods: {
    ...mapMutations({
      setQuoteModalStatus: "setQuoteModalStatus",
    }),
    ...mapActions({
      updateData: "list/updateData",
    }),

    async saveQuote(id) {
      this.setQuoteModalStatus();
      await axios
        .patch(`http://localhost:3000/api/books/${id}`, {
          quotes: [
            ...arguments,
            {
              number: this.selectedBook.quotes.length + 1,
              value: this.$refs.note.value,
            },
          ],
        })
        .then(() => this.$emit("update", this.$refs.note.value))
        .catch((err) => console.log(err));
      this.updateData();
    },
  },
};
</script>

<style scoped>
.form-box {
  width: 95%;
}

.form {
  flex-flow: column;
  width: 100%;
  padding: 15px;
}

.form,
.form-box {
  display: flex;
  justify-content: center;
  align-items: center;
}

label {
  padding-bottom: 10px;
  font-size: 20px;
  color: #222;
}

textarea {
  width: 90%;
  height: 186px;
  margin-bottom: 10%;
}

textarea::-webkit-scrollbar {
  width: 5px; /* width of the entire scrollbar */
}

textarea::-webkit-scrollbar-thumb {
  background-color: rgb(119, 123, 119); /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
  border: 1px solid rgb(23, 22, 20); /* creates padding around scroll thumb */
}
</style>
