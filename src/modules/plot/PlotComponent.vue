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
  width: 95%;
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
  background-image: linear-gradient(
    180deg,
    var(--vt-c-electric-violet) 0%,
    #dae4ff 99%
  );
  box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
  border-radius: 100px;
}
.desc {
  width: 100%;
  padding: 5px;
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
