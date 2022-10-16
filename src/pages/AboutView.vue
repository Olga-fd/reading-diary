<template>
  <div class="flex-container">
    <Plot />
    <Resume />
    <Quotes />
  </div>
</template>

<script>
import Plot from "@/components/PlotComponent.vue";
import Quotes from "@/components/QuotesComponent.vue";
import Resume from "@/components/ResumeComponent.vue";

export default {
  components: {
    Plot,
    Quotes,
    Resume,
  },
};
</script>

<style scoped>
.flex-container {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 1fr 1fr;
  grid-gap: 10px;
}

@media screen and (width < 720px) {
  .flex-container {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  }
}
</style>
