<template>
  <div>
    <div class="flex-box">
      <h1>
        {{ titleOfBook }}
      </h1>

      <RouterLink to="/">
        <button class="btnTransparent">Назад</button>
      </RouterLink>
    </div>
    <div class="flex-container">
      <Plot />
      <ImageOfBook />
      <Resume />
      <Quotes />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Plot from "@/modules/plot/PlotComponent.vue";
import Quotes from "@/modules/quotes/QuotesComponent.vue";
import Resume from "@/modules/resume/ResumeComponent.vue";
import ImageOfBook from "@/modules/picture/ImageOfBook.vue";

export default {
  components: {
    Plot,
    Quotes,
    Resume,
    ImageOfBook,
  },
  computed: {
    ...mapState({
      // books: (state) => state.list.books,
      idOfBook: (state) => state.list.idOfBook,
      titleOfBook: (state) => state.list.titleOfBook,
    }),
  },
};
</script>

<style scoped>
.flex-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr 1fr;
  grid-gap: 10px;
  width: 100%;
}

.btnTransparent {
  padding: 5px 20px;
  background-color: transparent;
  border: 2px solid #fff;
  border-radius: 5px;
  color: #fff;
}

.btnTransparent:hover {
  background-color: var(--vt-c-text-west-side);
  color: #222;
}

@media screen and (width < 720px) {
  .flex-container {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  }
}
</style>
