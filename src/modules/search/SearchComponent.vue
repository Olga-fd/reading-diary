<template>
  <div>
    <input
      type="search"
      placeholder="Найти"
      @input="search($event.target.value)"
    />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapMutations({
      search: "list/search",
    }),
  },
};
</script>

<style scoped>
input:focus {
  border: none;
  box-shadow: inset 0 0 2px 2px rgba(220, 46, 46, 0.6);
}
@media screen and (width < 720px) {
  input {
    width: 20%;
    font-size: 7px;
  }
}
</style>
