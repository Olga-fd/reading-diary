<template>
  <div class="form-box">
    <form class="form" @submit.prevent>
      <label class="form__label">Введите текст сюжета</label>
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
  computed: {
    ...mapState({
      selectedBook: (state) => state.list.selectedBook,
    }),
  },
  methods: {
    ...mapMutations({
      setModalStatus: "setModalStatus",
      setSelectedBook: "list/setSelectedBook",
    }),
    ...mapActions({
      updateData: "list/updateData",
    }),

    async savePlot(id) {
      await axios
        .patch(`http://localhost:3000/api/books/${id}`, {
          plot: this.$refs.note.value,
        })
        .catch((err) => {throw new Error('Ошибка при сохранении сюжета книги')});
      this.updateData();
      this.setModalStatus()
    },
  },
};
</script>
