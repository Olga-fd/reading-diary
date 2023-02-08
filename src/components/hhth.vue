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

new Vue({ el: '#demo', data: { sortKey: 'name', reverse: false, search: '',
columns: [ 'name', 'age' ], newUser: {}, users: [ { name: 'John', age: 50 }, {
name: 'Jane', age: 22 }, { name: 'Paul', age: 34 }, { name: 'Kate', age: 15 }, {
name: 'Amanda', age: 65 }, { name: 'Steve', age: 38 }, { name: 'Keith', age: 21
}, { name: 'Don', age: 50 }, { name: 'Susan', age: 21 }, ], }, computed: {
sortedUsers() { const k = this.sortKey; return this.users.sort((a, b) => {
return (a[k] < b[k] ? -1 : a[k] > b[k] ? 1 : 0) * [ 1, -1 ][+this.reverse]; });
}, filteredUsers() { const s = this.search.toLowerCase(); return
this.sortedUsers.filter(n => { return Object.values(n).some(m =>
m.toString().toLowerCase().includes(s)); }); }, }, methods: { sortBy(sortKey) {
this.reverse = (this.sortKey == sortKey) ? !this.reverse : false; this.sortKey =
sortKey; }, addUser() { this.users.push(this.newUser); this.newUser = {}; }, },
});
