<script>
// import WriteSaveComponent from "./WriteSaveComponent.vue";
export default {
  data() {
    return {
      plotClass: "plot",
      saveClass: "save-btn",
      writeClass: "write-btn",
      text: "Сюжет книги",
      valueText: "",
    };
  },
  components: {},
  methods: {
    saveText() {
      this.text = this.valueText;
      this.text = "";
    },
  },
};
</script>

<template>
  <div :class="plotClass">
    <h2>Сюжет</h2>
    <textarea :value="valueText"></textarea>
    <ButtonWithText>Написать</ButtonWithText>
    <p>{{ text }}</p>
  </div>
</template>

<style>
.plot {
  width: 100%;
  height: 65vh;
  padding: 15px;
  border: 2px solid yellow;
}
</style>
