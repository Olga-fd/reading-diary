<template>
  <div class="container" :class="{ 'light-theme': switchTheme == 'light' }">
    <HeaderComponent />
    <main>
      <RouterView />
    </main>

    <footer>
      <div class="fixed-container">
        <ThemeComponent />
      </div>
    </footer>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import { mapState } from "vuex";
import ThemeComponent from "./components/ThemeComponent.vue";
export default {
  data() {
    return {};
  },
  components: { HeaderComponent, ThemeComponent },
  computed: {
    ...mapState({
      switchTheme: (state) => state.theme,
    }),
  },
};
</script>

<style scoped>
.container {
  width: 100vw;
}
</style>
