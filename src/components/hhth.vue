<template>
  <div>
    {{
      document.querySelector(".desc").innerText === "Сюжет книги"
        ? "Написать"
        : "Редактировать"
    }}
    :data-id="book.id" @click="$store.commit('list/getDataAboutBook')"
  </div>
</template>

<script>
export default {
  getDataAboutBook(e) {
    let obj = { id: e.currentTarget.dataset.id, title: e.target.innerText };
    localStorage.setItem("numberOfBook", JSON.stringify(obj));
  },
};
</script>

<style scoped></style>
<li v-for="book in '$store.getters.list/filteredBooks'" :key="book.id">
  <input
    type="checkbox"
    v-model="book.read"
    @change="$store.commit('list/increment')"
  />
  <RouterLink to="/about" :class="{ read: book.read }">{{
    book.text
  }}</RouterLink>
  <button
    @click="$store.commit('list/removeBook(book)')"
    class="del-btn"
  >
    <!-- <IconDelete /> -->
  </button>
</li>
