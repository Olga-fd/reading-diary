<script>
export default {
  data() {
    return {
      search: "",
    };
  },
};
</script>

<template>
  <div>
    <input v-model="search" placeholder="Найти" />
  </div>
</template>
