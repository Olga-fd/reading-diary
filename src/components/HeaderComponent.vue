<template>
  <header class="headerHeight">
    <div class="header fixed-container">
      <h1 class="title"></h1>
      <RouterLink to="/">
        <IconLogoPic />
      </RouterLink>
      <Search v-if="!$route.fullPath.startsWith('/about')" />
    </div>
  </header>
</template>

<script>
import Search from "../modules/search/SearchComponent.vue";
import IconLogoPic from "./icons/IconLogoPic.vue";
import { mapState } from "vuex";
export default {
  components: {
    Search,
    IconLogoPic,
  },
  computed: {
    ...mapState({
      theme: (state) => state.theme,
    }),
  },
};
</script>

<style scoped>
.title {
  display: none;
  color: #c8e811;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
}
.headerHeight {
  width: 100%;
  height: 120px;
}

.light-theme .headerHeight {
  background-color: #6850ff;
}
img {
  max-width: 140px;
  max-height: 40px;
}

@media (width < 720px) {
  .header {
    display: block;
    padding: 0 0 10px 0;
    margin: 0 auto;
    text-align: center;
  }

  .header div:last-child {
    text-align: left;
  }
}
</style>
