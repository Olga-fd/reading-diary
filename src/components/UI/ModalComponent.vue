<template>
  <div class="modal" v-if="show" @click="hideModal">
    <div class="modal__content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalComponent",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    hideModal() {
      this.$emit("update:show", false);
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
</style>
