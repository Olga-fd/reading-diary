<template>
  <div class="form-box">
    <form class="form" @submit.prevent>
      <textarea :value="note" @input="inputNote"></textarea>
      <ButtonWithText @click="createNote"> Сохранить </ButtonWithText>
    </form>
  </div>
</template>

<script>
export default {
  name: "FormComponent",
  data() {
    return {
      note: "",
    };
  },
  methods: {
    createNote() {
      let obj = localStorage.numberOfBook;
      localStorage.setItem("numberOfBook", JSON.stringify(obj.this.note));
      //закрыть модальное окно еще
    },
    inputNote(e) {
      this.note = e.target.value;
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
  margin-bottom: 10%;
}
</style>
