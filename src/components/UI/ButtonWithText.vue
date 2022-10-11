<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "ButtonWithText",
};
</script>

<style scoped>
.btn {
  padding: 5px 10px;
  font-weight: 600;
  background-color: coral;
  border-radius: 5px;
  border: none;
}
.btn:hover {
  background-color: crimson;
}
</style>
