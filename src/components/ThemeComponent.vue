<script>
export default {
  data() {
    return {};
  },
};
</script>

<template>
  <h2>Отзыв</h2>

  <button @click="hideCompleted = !hideCompleted">
    {{ hideCompleted ? "Show all" : "Hide completed" }}
  </button>
</template>
