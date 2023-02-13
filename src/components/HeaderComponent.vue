<template>
  <header class="headerHeight">
    <div class="header fixed-container">
      <h1 class="title">{{ message }}</h1>
      <RouterLink to="/">
        <!-- <IconLogoLight /> -->
        <IconLogoPic />
      </RouterLink>
      <Search v-if="$route.fullPath !== '/about'" />
    </div>
  </header>
</template>

<script>
import Search from "../modules/search/SearchComponent.vue";
// import IconLogoLight from "./icons/IconLogoLight.vue";
import IconLogoPic from "./icons/IconLogoPic.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      message: "",
      // titleClass: "title",
      // headerClass: "header",
      // headerHeightClass: "headerHeight",
    };
  },
  components: {
    Search,
    // IconLogoLight,
    IconLogoPic,
  },
  computed: {
    ...mapState({
      theme: (state) => state.theme,
    }),
  },
};
</script>

<style>
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
  max-height: 100px;
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
