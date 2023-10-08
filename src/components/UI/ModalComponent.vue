<template>
  <teleport to="#portal-target">
    <div class="modal" v-if="modalVisible" @click="hideModal">
      <div class="modal__content" :class="{ 'light-theme': switchTheme == 'light' }" @click.stop>
        <PlotFormComponent v-if="currentSlide === 'plot'" />
        <ResumeFormComponent v-if="currentSlide === 'resume'" />
        <QuoteFormComponent v-if="currentSlide === 'quote'" />
      </div>
    </div>
  </teleport>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import PlotFormComponent from '../../modules/plot/PlotFormComponent.vue'
import ResumeFormComponent from '../../modules/resume/ResumeFormComponent.vue'
import QuoteFormComponent from '../../modules/quotes/QuoteFormComponent.vue'

export default {
  name: "ModalComponent",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  components: { 
    PlotFormComponent,
    ResumeFormComponent,
    QuoteFormComponent,
  },
  computed: {
    ...mapState({
      modalVisible: (state) => state.modalVisible,
      switchTheme: (state) => state.theme,
      currentSlide: (state) => state.currentSlide,
    }),
  },
  methods: {
    ...mapMutations({
      setModalStatus: "setModalStatus",
    }),
    hideModal() {
      this.setModalStatus()
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}
.modal__content {
  min-width: 50vw;
  min-height: 50vh;
  background: #bbb;
  border-radius: 12px;
}

.modal,
.modal__content {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (width < 768px) {
  .modal__content {
    width: 90vw;
    height: 40vh;
  }
}
</style>
