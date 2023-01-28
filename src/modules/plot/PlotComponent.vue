<template>
  <div class="plot" @click="setSection">
    <h2>Сюжет / Описание</h2>
    <BtnWithModal />
    <p v-if="$store.state.infoData.length > 0" class="desc">
      {{ $store.state.note }}
    </p>
    <p v-else class="desc" contenteditable="true">{{ text }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      text: "Сюжет книги",
      valueText: "",
    };
  },
  components: {},
  computed: {
    ...mapState({
      section: (state) => state.section,
    }),
    ...mapGetters({}),
  },
  methods: {
    ...mapMutations({
      updateSection: 'updateSection'
    }),
    setSection(e) {
      store.commit('increment', "plot");
      console.log(store);
    },
  },
};
</script>

<style scoped>
.plot {
  width: 70%;
  height: 65vh;
  padding: 15px;
  border: 2px solid yellow;
}
</style>

<!-- @click="setSection" -->