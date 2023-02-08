<template>
  <div class="form-box">
    <form class="form" @submit.prevent>
      <textarea :value="note" @input="updateNote"></textarea>
      <ButtonWithText> Сохранить </ButtonWithText>
    </form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "FormComponent",
  data() {
    return {};
  },

  methods: {
    ...mapMutations({
      setModalStatus: "setModalStatus",
    }),

    createNote() {
      this.setModalStatus();
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
textarea {
  width: 90%;
  height: 186px;
  margin-bottom: 10%;
}
</style>
