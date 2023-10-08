<template>
  <div class="fixed-container">
    <div class="flex-box center">
      <div class="flex-box center">
        <h1
          :class="{ 'book-title': isEditable }"
          class="gradient-text"
          ref="titleOfBook"
          :contenteditable="isEditable"
        >
          {{ selectedBook.title }}
        </h1>
        <button @click="editTitle(selectedBook.id)" class="list__edit-btn"></button>
      </div>

      <RouterLink to="/">
        <button v-if='isMobileScreen' class="btnTransparent">
          <ButtonBack />
        </button>
        <button v-else class="btnTransparent">Назад</button>
      </RouterLink>
    </div>

    <p class="buttons">
      <button @click="slideTo(1)" :class="{ active: activeButton === 1 }" class="slide_btn">Сюжет</button>
      <button @click="slideTo(2)" :class="{ active: activeButton === 2 }" class="slide_btn">Отзыв</button>
      <button @click="slideTo(3)" :class="{ active: activeButton === 3 }" class="slide_btn">Цитаты</button>
    </p>
    <swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="50"
      @swiper="setSwiperRef"
    >
      <swiper-slide class="flex-box flex-padding">
        <Plot />
      </swiper-slide>
      <swiper-slide class="flex-padding">
        <Resume />
      </swiper-slide>
      <swiper-slide class="flex-padding">
        <Quotes />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import axios from "axios";
import Plot from "../modules/plot/PlotComponent.vue";
import Quotes from "../modules/quotes/QuotesComponent.vue";
import Resume from "../modules/resume/ResumeComponent.vue";
import ButtonBack from "@/components/UI/ButtonBack.vue";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { ref } from 'vue';
import "swiper/css";
import "swiper/css/bundle";

export default {
  data() {
    return {
      isEditable: false,
      isMobileScreen: false
    };
  },
  components: {
    Plot,
    Quotes,
    Resume,
    Swiper,
    SwiperSlide,
    ButtonBack,
  },
  computed: {
    ...mapState({
      selectedBook: (state) => state.list.selectedBook,
    }),
  },
  methods: {
    ...mapMutations({
      setSelectedBook: "list/setSelectedBook",
    }),

    async editTitle(id) {
      this.isEditable = !this.isEditable;
      await axios.patch(`http://localhost:3000/api/books/${id}`, {
        title: this.$refs.titleOfBook.innerText,
      });
    },

    checkScreenSize() {
      this.isMobileScreen = window.innerWidth <= 768
    },

    async fetchBook(id) {
      await axios
        .get(`http://localhost:3000/api/books/${id}`)
        .then((response) => this.setSelectedBook(response.data))
        .catch((err) => {
          throw new Error('Ошибка при запросе книги с сервера')
        });
    },
  },
  setup() {
    let swiperRef = null;
    const activeButton = ref(1);
    const setSwiperRef = (swiper) => {
      swiperRef = swiper;
    };
    const slideTo = (index) => {
      swiperRef.slideTo(index - 1, 0);
      activeButton.value = index;
    };
    return {
      modules: [Navigation, Pagination],
      swiperRef: null,
      activeButton,
      setSwiperRef,
      slideTo
    };
  },
  mounted() {
    const id = this.$route.params.id;
    this.checkScreenSize()
    window.addEventListener('resize', this.checkScreenSize)
    this.fetchBook(id)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize)
  },
};
</script>

<style scoped>
h1 {
  padding: 3px;
}
.flex-box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.flex-padding {
  padding: 1% 5%;
}

.center {
  align-items: center;
}

.flex-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr 1fr;
  grid-gap: 10px;
  width: 100%;
}

li {
  display: inline-block;
}

.btnTransparent {
  padding: 5px 20px;
  background-color: transparent;
  border: 2px solid #fff;
  border-radius: 5px;
  color: #fff;
}

.btnTransparent:hover {
  background-color: var(--vt-c-electric-violet);
}

.light-theme .btnTransparent {
  border: 2px solid var(--vt-c-black-soft);
}
.light-theme .btnTransparent:hover {
  border: 2px solid #fff;
  background-color: var(--vt-c-electric-violet);
  color: #fff;
}

.book-title {
  outline: 2px solid var(--vt-c-cornflower-blue);
}

.list__edit-btn {
  width: 25px;
  height: 25px;
  margin-left: 10px;
  padding: 0;
  background: url("../assets/images/edit.svg") no-repeat;
  background-position: bottom center;
  border: none;
}

.buttons {
  display: flex;
  gap: 20px;
  margin-bottom: 0;
}

.slide_btn {
  display: block;
  width: 120px;
  height: 40px;
  border: 1px solid var(--vt-c-electric-violet);
  border-bottom: 0;
  border-radius:5px 5px 0 0;
  background: transparent;
  font-size: clamp(16px, 2.5vw, 20px);
  font-weight: 600;
  color: var(--vt-c-electric-violet);
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  transition: all 200ms ease-in-out;
}

.slide_btn:hover {
  border-color: var(--vt-c-electric-violet);
  box-shadow: 0 0 10px var(--vt-c-electric-violet);
}

.flex-padding {
  padding: 10px;
}

.slide_btn.active {
  background: var(--vt-c-electric-violet);
  color:  var(--vt-c-gorse);
}

.gradient-text {
  background: linear-gradient(to right, var(--color-text), #c9c9f6);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: background-position 1.5s;
}

.light-theme .gradient-text {
  background: linear-gradient(to right, var(--vt-c-electric-violet), #5a05b5);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: background-position 1.5s;
}

@media (width < 720px) {
  .flex-container {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  }

  .list__edit-btn {
    width: 11px;
    background-position: center center;
  }

  .btnTransparent {
    padding: 5px;
  }

  .slide_btn {
    border-bottom: 1px solid var(--vt-c-electric-violet);;
  }
}
</style>
