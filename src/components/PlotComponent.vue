<template>
  <div class="plot">
    <h2>Сюжет / Описание</h2>
    <BtnWithModal />
    <p v-if="$store.state.infoData.length > 0" class="desc">
      {{ $store.state.note }}
    </p>
    <p v-else class="desc" contenteditable="true">{{ text }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "Сюжет книги",
      valueText: "",
    };
  },
  components: {},
  methods: {},
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
