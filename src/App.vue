<script>
import ListOfBooks from "./components/ListOfBooks.vue";
import Plot from "./components/PlotComponent.vue";
import Quotes from "./components/QuotesComponent.vue";
import Resume from "./components/ResumeComponent.vue";
import ImageOfBook from "./components/ImageOfBook.vue";
import HeaderComponent from "./components/HeaderComponent.vue";

export default {
  data() {
    return {
      flexClass: "flex-container",
      awesome: true,
      hideCompleted: false,
    };
  },
  components: {
    ListOfBooks,
    Plot,
    Quotes,
    Resume,
    ImageOfBook,
    HeaderComponent,
  },

  methods: {
    increment() {
      this.counter.count++;
    },
    toggle() {
      this.awesome = !this.awesome;
    },
  },
};
</script>

<template>
  <HeaderComponent />

  <div :class="flexClass">
    <ListOfBooks></ListOfBooks>
    <Plot>
      <ImageOfBook />
    </Plot>
    <Resume />
    <Quotes />
  </div>

  <!-- <button @click="toggle">toggle</button>
  <h1 v-if="awesome">Vue is awesome!</h1>
  <h1 v-else>Oh no 😢</h1> -->
</template>

<style scoped>
.flex-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 10px;
}

@media screen and (width < 720px) {
  .flex-container {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  }
}
</style>
