<template>
  <div>
    <h2>Отзыв</h2>
    <BtnWithModalResume />
    <div class="inner">
      <p>{{ selectedBook.review }}</p>
    </div>
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

<style scoped></style>
