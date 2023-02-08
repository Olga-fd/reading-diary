<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
export default {
  data() {
    return {};
  },
  components: { HeaderComponent },

  // methods: {
  //   increment() {
  //     this.counter.count++;
  //   },
  //   toggle() {
  //     this.awesome = !this.awesome;
  //   },
  // },
};
</script>

<template>
  <HeaderComponent />
  <div>
    <RouterView> </RouterView>
  </div>
</template>

<style scoped></style>
