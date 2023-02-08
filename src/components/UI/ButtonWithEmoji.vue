<template>
  <!-- <button class="btn">😊</button> -->
  <div>
    <input type="button" value="😊" />
    <input type="button" value="❤️" />
    <input type="button" value="👍" />
    <input type="button" value="👎" />
    <input type="button" value="😴" />
    <input type="button" value="😑" />
    <input type="button" value="😢" />
  </div>
</template>

<script>
export default {
  name: "ButtonWithEmoji",
};
</script>

<style scoped>
.btn {
  padding: 5px 10px;
  margin-bottom: 20px;
  font-weight: 600;
  background-color: rgba(255, 127, 80, 0.8);
  border-radius: 5px;
  border: none;
}
.btn:hover {
  background-color: rgba(220, 20, 60, 0.8);
}
</style>
