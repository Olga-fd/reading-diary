<template>
  <div>
    <h2>Цитаты</h2>
    <BtnWithModalQuote />
    <div v-if="selectedBook.quotes.length > 0">
      <ul class="quotes" v-for="quote in selectedBook.quotes" :key="quote.id">
        <li>
          {{ quote.value }}
        </li>
      </ul>
    </div>

    <blockquote v-else></blockquote>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BtnWithModalQuote from "./BtnWithModalQuote.vue";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      selectedBook: (state) => state.list.selectedBook,
    }),
  },
  methods: {},
  components: { BtnWithModalQuote },
};
</script>

<style scoped>
.quotes {
  list-style: square;
}

li {
  margin-bottom: 10px;
}
</style>
