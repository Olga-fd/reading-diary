<template>
  <div class="plot" @click="setSection" @update="updatePlot">
    <h2>Сюжет / Описание</h2>
    <BtnWithModalPlot />
    <div class="plot-inner">
      <p ref="plotOfBook" v-if="selectedBook.plot" class="desc">
        {{ selectedBook.plot }}
      </p>
      <p v-else class="desc">{{ text }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BtnWithModalPlot from "./BtnWithModalPlot.vue";

export default {
  data() {
    return {
      text: "Сюжет книги",
    };
  },
  components: { BtnWithModalPlot },
  computed: {
    ...mapState({
      selectedBook: (state) => state.list.selectedBook,
    }),
  },
  methods: {},
};
</script>

<style scoped>
.plot {
  width: 75%;
  height: 65vh;
  padding: 15px 0 15px 15px;
}

.plot-inner {
  height: 78%;
  margin-bottom: 10px;
  overflow-y: scroll;
}

.plot-inner::-webkit-scrollbar {
  width: 5px; /* width of the entire scrollbar */
}

/* .plot-inner::-webkit-scrollbar-track {
  background: orange; /* color of the tracking area */
/* border-radius: 100px;
}  */

.plot-inner::-webkit-scrollbar-thumb {
  background-color: rgb(23, 195, 14); /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
  border: 1px solid orange; /* creates padding around scroll thumb */
}
.desc {
  width: 100%;
}

@media (width < 720px) {
  .plot-inner::-webkit-scrollbar {
    width: 2px;
  }

  .plot {
    width: 100%;
  }
}
</style>
