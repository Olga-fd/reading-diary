<template>
  <div>
    <h2>Отзыв</h2>
    <BtnWithModalResume />
    <p>{{ selectedBook.review }}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BtnWithModalResume from "./BtnWithModalResume.vue";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      selectedBook: (state) => state.list.selectedBook,
    }),
  },
  components: { BtnWithModalResume },
};
</script>

<style scoped>
/* p {
  column-count: 2;
  column-gap: 4%;
} */
</style>
