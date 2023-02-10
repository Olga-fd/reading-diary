<script>
import Search from "../modules/search/SearchComponent.vue";
import IconLogoDark from "./icons/IconLogoDark.vue";
import IconLogoLight from "./icons/IconLogoLight.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      message: "",
      titleClass: "title",
      headerClass: "header",
      headerHeightClass: "headerHeight",
    };
  },
  components: {
    Search,
    IconLogoLight,
    IconLogoDark,
  },
  computed: {
    ...mapState({
      theme: (state) => state.theme,
    }),
  },
};
</script>

<template>
  <div :class="headerHeightClass">
    <div :class="headerClass">
      <h1 :class="titleClass">{{ message }}</h1>
      <RouterLink to="/">
        <IconLogoLight v-if="theme !== 'dark'" />
        <IconLogoDark v-else />
      </RouterLink>
      <Search v-if="$route.fullPath !== '/about'" />
    </div>
  </div>
</template>

<style>
.title {
  display: none;
  color: #c8e811;
}
.header {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
}
.headerHeight {
  height: 100px;
}
img {
  max-width: 140px;
  max-height: 40px;
}

@media (width < 720px) {
  .header {
    display: block;
    padding: 0;
    margin: 0 auto;
    text-align: center;
  }

  .header div:last-child {
    text-align: left;
  }
}
</style>
