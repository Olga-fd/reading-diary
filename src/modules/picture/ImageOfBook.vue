<template>
  <div id="img">
    <button class="btnImg" tooltip="Добавить картинку">+</button>
    <input
      type="file"
      placeholder="+"
      class="btnImg"
      tooltip="Добавить картинку"
      @change="savePic(1, $event.target.value)"
    />
    <img :src="imageSrc" />
  </div>

  <!-- <button @click="hideCompleted = !hideCompleted">
    {{ hideCompleted ? "Show all" : "Hide completed" }}
  </button> -->
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      imageSrc: "",
    };
  },
  computed: {
    ...mapState({
      selectedBook: (state) => state.list.selectedBook,
    }),
  },

  methods: {
    async savePic(id, path) {
      await axios
        .patch(`http://localhost:3000/api/books/${id}`, {
          picture: path,
        })
        .then(() => console.log(path))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
#img {
  width: 25%;
  border: 2px solid yellow;
  border-radius: 5px;
  /* background: url("@/assets/images/book.svg") no-repeat; */

  /* background: url("../../assets/images/pictures/ivanhoe.jpg"); */
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.btnImg {
  margin-top: 1%;
  margin-left: 1%;
  color: lightyellow;
  background: rgba(74, 71, 71, 0.5);
  border-radius: 5px;
}
</style>
