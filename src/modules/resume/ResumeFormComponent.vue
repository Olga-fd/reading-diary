<template>
  <div class="form-box">
    <form class="form" @submit.prevent>
      <label class="form__label">Введите отзыв</label>
      <textarea ref="note" :value="selectedBook.review"></textarea>
      <div class="emoji-box">
        <input type="button" value="😊" @click="setEmoji" />
        <input type="button" value="❤️" @click="setEmoji" />
        <input type="button" value="👍" @click="setEmoji" />
        <input type="button" value="👎" @click="setEmoji" />
        <input type="button" value="😴" @click="setEmoji" />
        <input type="button" value="😑" @click="setEmoji" />
        <input type="button" value="😢" @click="setEmoji" />
      </div>
      <ButtonWithText @click="saveResume(selectedBook.id)">
        Сохранить
      </ButtonWithText>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "ResumeFormComponent",
  data() {
    return {};
  },
  components: {},
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
    async saveResume(id) {
      await axios
        .patch(`http://localhost:3000/api/books/${id}`, {
          review: this.$refs.note.value,
        })
        .catch((err) => {throw new Error('Ошибка при сохранении отзыва о книге')});
      this.updateData();
      this.setModalStatus();
    },
    setEmoji(e) {
      this.$refs.note.value = this.$refs.note.value + e.target.value;
    },
  },
};
</script>

<style scoped>
  textarea {
    margin-bottom: 0;
  }
  .emoji-box {
  display: flex;
  margin-bottom: 10%;
}

input {
  width: 40px;
  height: 40px;
  padding: 0;
  background: #fff;
  border-radius: 10px;
  display: block;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.2s;
  cursor: pointer;
}

input:hover {
  transform: rotateX(38deg) translateY(7px);
}
</style>