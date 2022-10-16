<script>
import ImageOfBook from "@/components/ImageOfBook.vue";
export default {
  data() {
    return {
      text: "Сюжет книги",
      valueText: "",
      title: JSON.parse(localStorage.numberOfBook).title,
    };
  },
  components: { ImageOfBook },
  methods: {
    saveText() {
      this.text = this.valueText;
      this.text = "";
    },
  },
};
</script>

<template>
  <div class="plot">
    <h2>Сюжет / Описание</h2>
    <h3>{{ title }}</h3>
    <BtnWithModal />
    <ImageOfBook />
    <p class="desc"></p>
    <p class="desc" contenteditable="true">{{ text }}</p>
  </div>
</template>

<style scoped>
.plot {
  width: 100%;
  height: 65vh;
  padding: 15px;
  border: 2px solid yellow;
}
.desc {
  z-index: 9;
}
</style>
