<template>
  <div class="form-box">
    <form class="form" @submit.prevent>
      <textarea :value="note" @input="updateNote"></textarea>
      <ButtonWithText @click="$store.commit('addText')">
        Сохранить
      </ButtonWithText>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import axios from "axios";
export default {
  name: "PlotFormComponent",
  data() {
    return {
      props: {
        modalVisible: false,
      },
    };
  },
  computed: {
    ...mapState({
      infoData: (state) => state.infoData,
      note: (state) => state.note,
    }),
    ...mapGetters({}),
  },
  methods: {
    ...mapMutations({
      createNote: "plot/createNote",
    }),

    updateNote(e) {
      this.$store.commit("updateNote", e.target.value);
    },

    createNote() {
      this.modalVisible = false;
      console.log(this.modalVisible);
    },

    async savePlot() {
      try {
        const response = await axios.post(`/api/books/${this.idOfBook}`, {
          plotText: "15445",
        });
        console.log(response);
      } catch (err) {
        alert(err);
      }
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
