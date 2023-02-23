<template>
  <div class="fixed-container">
    <div class="flex-box">
      <div class="flex-box center">
        <h1
          :class="{ 'book-title': isEditable }"
          ref="titleOfBook"
          :contenteditable="isEditable"
        >
          {{ selectedBook.title }}
        </h1>
        <button
          @click="editTitle(selectedBook.id)"
          class="list__edit-btn"
        ></button>
      </div>

      <RouterLink to="/">
        <button class="btnTransparent">Назад</button>
      </RouterLink>
    </div>

    <swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="50"
      navigation
      :pagination="{ clickable: true }"
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
import { mapState } from "vuex";
import axios from "axios";
import Plot from "../modules/plot/PlotComponent.vue";
import Quotes from "../modules/quotes/QuotesComponent.vue";
import Resume from "../modules/resume/ResumeComponent.vue";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/bundle";

export default {
  data() {
    return {
      isEditable: false,
    };
  },
  components: {
    Plot,
    Quotes,
    Resume,
    Swiper,
    SwiperSlide,
  },
  computed: {
    ...mapState({
      selectedBook: (state) => state.list.selectedBook,
    }),
  },
  methods: {
    async editTitle(id) {
      this.isEditable = !this.isEditable;
      await axios.patch(`http://localhost:3000/api/books/${id}`, {
        title: this.$refs.titleOfBook.innerText,
      });
    },
  },
  setup() {
    return {
      modules: [Navigation, Pagination],
    };
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
  border: 2px solid #222;
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

@media screen and (width < 720px) {
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
}
</style>
