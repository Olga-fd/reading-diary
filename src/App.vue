<template>
  <div class="container" :class="{ 'light-theme': switchTheme == 'light' }">
    <HeaderComponent />
    <main>
      <RouterView />
    </main>

    <footer>
      <div class="fixed-container">
        <ThemeComponent />
        <time>{{ setTime() }}</time>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from "vuex";
import HeaderComponent from "./components/HeaderComponent.vue";
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
  methods: {
    setTime() {
      setInterval(() => {
        document.querySelector("time").innerHTML = new Date().toLocaleString();
      }, 1000);
    },
  },
};
</script>

<style scoped>
.container {
  width: 100vw;
}

time {
  display: inline-block;
  margin-right: 0;
  color: #fff;
}
</style>
