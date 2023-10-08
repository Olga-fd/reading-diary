<template>
  <div class="plot" @click="setSection" @update="updatePlot">
    <div class="flex-box">
      <BtnWithModalPlot />
      <input
        type='file'
        id="file"
        accept='image/*'
        @change="loadImage"
        class="file_input"
      />
      <label for="file" class="btn">Добавить изображение</label>
    </div>
    
    <div :class="{ 'col': !selectedBook.plot }" class="inner">
      <p ref="plotOfBook" v-if="selectedBook.plot" class="desc">
        {{ selectedBook.plot }}
      </p>
      <p v-else class="desc">{{ text }}</p>
      <img v-if="selectedBook.picture" :src="selectedBook.picture" class="book_img">
      <img v-else src="../../assets/images/book.png" class="book_img">
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import BtnWithModalPlot from "./BtnWithModalPlot.vue";
import axios from "axios";

export default {
  data() {
    return {
      text: "Сюжет книги",
    };
  },
  components: { BtnWithModalPlot },
  computed: {
    ...mapState({
      selectedBook: (state) => state.list.selectedBook,
    }),
  },
  methods: {
    ...mapMutations({
      setSelectedBook: "list/setSelectedBook",
    }),

    loadImage(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof reader.result === 'string') {
          // Конвертируем файл в base64
          const base64String = event.target.result;
          this.savePicOfBook(this.selectedBook.id, base64String)
        }
      };
      reader.readAsDataURL(file);
    },
    async savePicOfBook(id, src) {
      await axios
        .patch(`http://localhost:3000/api/books/${id}`, {
          picture: src,
        })
        .then(() => this.fetchBook(id))
        .catch((err) => {
          throw new Error('Ошибка при сохранении картинки книги на сервере')
        });
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
};
</script>

<style scoped>
.plot {
  width: 100%;
}

.book_img {
  width: 30%;
  object-fit: contain;
}

.inner {
  display: flex;
  gap: 10px;
}

.col {
  flex-direction: column;
}

.desc {
  width: 100%;
  padding: 5px;
  font-size: 16px;
}

.file_input {
  display: none;
}

@media (width < 450px) {
  .flex-box {
    flex-direction: column;
  }

  label {
    line-height: 16.1px;
  }
}
</style>
