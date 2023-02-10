<template>
  <button
    class="switch-btn"
    :class="{ 'switch-on': switchTheme !== 'dark' }"
    @click="switchThemeOfDisplay"
  >
    <svg
      class="light"
      width="20px"
      height="20px"
      stroke-width="1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="#000000"
    >
      <path
        d="M21 2l-1 1M3 2l1 1M21 16l-1-1M3 16l1-1M9 18h6M10 21h4M12 3C8 3 5.952 4.95 6 8c.023 1.487.5 2.5 1.5 3.5S9 13 9 15h6c0-2 .5-2.5 1.5-3.5h0c1-1 1.477-2.013 1.5-3.5.048-3.05-2-5-6-5z"
        stroke="#FFED00"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>

    <svg
      class="dark"
      width="20px"
      height="20px"
      stroke-width="1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="#000000"
    >
      <path
        d="M9 18h6M10 21h4M16.5 11.5c1-1 1.477-2.013 1.5-3.5.048-3.05-2-5-6-5-1.168 0-2.169.166-3 .477M9 15c0-2-.5-2.5-1.5-3.5S6.023 9.487 6 8a5.618 5.618 0 01.168-1.5M3 3l18 18"
        stroke="#000000"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  </button>

  <!-- <button @click="hideCompleted = !hideCompleted">
    {{ hideCompleted ? "Show all" : "Hide completed" }}
  </button> -->
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      // switchTheme: "dark",
    };
  },
  computed: {
    ...mapState({
      switchTheme: (state) => state.theme,
    }),
  },
  methods: {
    ...mapMutations({
      setTheme: "setTheme",
    }),
    switchThemeOfDisplay() {
      this.switchTheme =
        this.switchTheme == "dark"
          ? this.setTheme("light")
          : this.setTheme("dark");
      if (this.switchTheme == "dark") {
        document.body.classList.add("light-theme");
      } else {
        document.body.classList.remove("light-theme");
      }
    },
  },
};
</script>

<style scoped>
.switch-btn {
  display: inline-block;
  width: 66px; /* ширина */
  height: 30px; /* высота */
  border-radius: 19px; /* радиус скругления */
  background: #bfbfbf; /* цвет фона */
  z-index: 0;
  margin: 0;
  padding: 0;
  left: -1%;
  border: none;
  cursor: pointer;
  position: relative;
  transform: scale(0.3);
  transition-duration: 300ms; /* анимация */
}
.switch-btn::after {
  content: "";
  height: 26px; /* высота кнопки */
  width: 26px; /* ширина кнопки */
  border-radius: 17px;
  background: #fff; /* цвет кнопки */
  top: 2px; /* положение кнопки по вертикали относительно основы */
  left: 3px; /* положение кнопки по горизонтали относительно основы */
  transition-duration: 300ms; /* анимация */
  position: absolute;
  z-index: 1;
}
.switch-on {
  background: #303332;
}
.switch-on::after {
  left: 37px;
}

.light {
  top: 5px;
  left: 8px;
  position: absolute;
}
.dark {
  top: 5px;
  right: 9px;
  position: absolute;
}

@media (width < 720px) {
  .switch-btn {
    left: -6%;
  }
}
</style>
