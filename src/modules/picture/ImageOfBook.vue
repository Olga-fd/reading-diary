<script>
export default {
  data() {
    return {};
  },
};
</script>

<template>
  <div id="img">
    <button class="btnImg" tooltip="Добавить картинку">+</button>
    <!-- <input
      type="file"
      placeholder="+"
      class="btnImg"
      tooltip="Добавить картинку"
    /> -->
  </div>

  <!-- <button @click="hideCompleted = !hideCompleted">
    {{ hideCompleted ? "Show all" : "Hide completed" }}
  </button> -->
</template>

<style scoped>
#img {
  border: 2px solid yellow;
  border-radius: 5px;
  background: url("@/assets/images/book.svg") no-repeat;
  background-position: center;
}

.btnImg {
  margin-top: 1%;
  margin-left: 1%;
  color: lightyellow;
  background: rgba(74, 71, 71, 0.5);
  border-radius: 5px;
}

[tooltip] {
  position: relative;
}

[tooltip]::before,
[tooltip]::after {
  display: none;
  left: 50%;
  text-transform: none;
  font-size: 0.9em;
  line-height: 1;
  user-select: none;
  pointer-events: none;
  position: absolute;
  opacity: 0;

  transform: translate(-50%, -0.5em);
}
[tooltip]::before {
  content: "";
  z-index: 1001;
  bottom: 109%;
  border: 5px solid transparent;
  border-bottom-width: 0;
  border-top-color: #333;
}
[tooltip]::after {
  min-width: 3em;
  max-width: 21em;
  content: attr(tooltip);
  font-family: Helvetica, sans-serif;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 1ch 1.5ch;
  border-radius: 0.3ch;
  box-shadow: 0 1em 2em -0.5em rgba(0, 0, 0, 0.35);
  background: #333;
  color: #fff;
  z-index: 1000;
  bottom: calc(100% + 7px);
}

[tooltip]:hover::before,
[tooltip]:hover::after {
  display: block;
  animation: tooltips-vert 300ms ease-out forwards;
}

/* KEYFRAMES */
@keyframes tooltips-vert {
  to {
    opacity: 0.9;
    transform: translate(-50%, 0);
  }
}
</style>
