<template>
  <div>
    <div class="flex-box">
      <BtnWithModalResume />
    </div>
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
