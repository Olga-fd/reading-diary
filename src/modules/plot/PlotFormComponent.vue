<template>
  <div class="form-box">
    <form class="form" @submit.prevent>
      <label>Введите текст сюжета</label>
      <textarea ref="note" :value="selectedBook.plot"></textarea>
      <ButtonWithText @click="savePlot(selectedBook.id)">
        Сохранить
      </ButtonWithText>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "PlotFormComponent",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      selectedBook: (state) => state.list.selectedBook,
    }),
  },
  methods: {
    ...mapMutations({
      setPlotModalStatus: "setPlotModalStatus",
      setSelectedBook: "list/setSelectedBook",
    }),
    ...mapActions({
      updateData: "list/updateData",
    }),

    async savePlot(id) {
      this.setPlotModalStatus();
      await axios
        .patch(`http://localhost:3000/api/books/${id}`, {
          plot: this.$refs.note.value,
        })
        .then(() => console.log(this.$refs.note))
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
  /* font-size: 1.25rem; */
  font-size: clamp(1rem, 0.5rem + 1.5vw, 1.25rem);
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
