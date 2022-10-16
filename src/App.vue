<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
export default {
  data() {
    return {
      awesome: true,
      hideCompleted: false,
    };
  },
  components: { HeaderComponent },

  methods: {
    increment() {
      this.counter.count++;
    },
    toggle() {
      this.awesome = !this.awesome;
    },
  },
};
</script>

<template>
  <HeaderComponent />
  <div>
    <RouterView> </RouterView>
  </div>
</template>

<style scoped></style>

<!-- <button @click="toggle">toggle</button>
  <h1 v-if="awesome">Vue is awesome!</h1>
  <h1 v-else>Oh no 😢</h1> -->
