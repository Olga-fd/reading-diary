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
  margin-bottom: 20px;
  font-weight: 600;
  background-color: rgb(104 80 255 / 80%);
  /* background-color: rgba(255, 127, 80, 0.8); */
  border-radius: 5px;
  border: none;
  color: #e8ff4f;
}
.btn:hover {
  background-color: rgba(220, 20, 60, 0.8);
}

@media (width < 720px) {
  .btn {
    padding: 5px;
  }
}
</style>
