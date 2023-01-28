<script>
import Search from "../modules/search/SearchComponent.vue";
import IconLogoLight from "./icons/IconLogoLight.vue";
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
  },
};
</script>

<template>
  <div :class="headerHeightClass">
    <div :class="headerClass">
      <h1 :class="titleClass">{{ message }}</h1>
      <RouterLink to="/">
        <IconLogoLight />
      </RouterLink>
      <Search />
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
  width: 100%;
  height: 100px;
}
img {
  max-width: 140px;
  max-height: 40px;
}
</style>
