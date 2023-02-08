<template>
  <div class="form-box">
    <form class="form" @submit.prevent>
      <label>Введите отзыв</label>
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
// import ButtonWithEmoji from "@/components/UI/ButtonWithEmoji.vue";

export default {
  name: "ResumeFormComponent",
  data() {
    return {};
  },
  components: {
    // ButtonWithEmoji,
  },
  computed: {
    ...mapState({
      selectedBook: (state) => state.list.selectedBook,
    }),
  },
  methods: {
    ...mapMutations({
      setResumeModalStatus: "setResumeModalStatus",
    }),
    ...mapActions({
      updateData: "list/updateData",
    }),
    async saveResume(id) {
      this.setResumeModalStatus();
      await axios
        .patch(`http://localhost:3000/api/books/${id}`, {
          review: this.$refs.note.value,
        })
        .then(() => console.log(this.$refs.note.value))
        .catch((err) => console.log(err));
      this.updateData();
    },
    setEmoji(e) {
      this.$refs.note.value = this.$refs.note.value + e.target.value;
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

.emoji-box {
  margin-bottom: 10%;
}

textarea {
  width: 90%;
  height: 186px;
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
