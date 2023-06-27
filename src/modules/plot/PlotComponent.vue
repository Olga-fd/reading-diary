<template>
  <div class="plot" @click="setSection" @update="updatePlot">
    <h2>Сюжет / Описание</h2>
    <BtnWithModalPlot />
    <div class="inner">
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
  width: 100%;
}

.desc {
  width: 100%;
  padding: 5px;
  font-size: 16px;
}
</style>
