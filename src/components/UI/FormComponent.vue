<template>
  <div class="form-box">
    <form class="form" @submit.prevent>
      <textarea v-model.lazy="$store.state.note"></textarea>
      <ButtonWithText @click="$store.commit('addText')">
        Сохранить
      </ButtonWithText>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  name: "FormComponent",
  data() {
    return {
      // note: "",
    };
  },
  computed: {
    ...mapState({
      infoData: (state) => state.plot.infoData,
    }),
    ...mapGetters({}),
  },
  methods: {
    ...mapMutations({
      createNote: "plot/createNote",
    }),
    createNote() {
      // const newNote = {
      //   id: Date.now(),
      //   note: this.note,
      // };
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
  height: 186px;
  margin-bottom: 10%;
}
</style>
