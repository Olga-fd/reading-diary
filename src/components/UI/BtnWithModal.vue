<template>
  <ButtonWithText @click="showModal">Написать</ButtonWithText>
  <ModalComponent v-model:show="modalVisible">
    <FormComponent />
  </ModalComponent>
</template>

<script>
export default {
  name: "BtnWithModal",
  data() {
    return {
      modalVisible: false,
    };
  },

  components: {},
  methods: {
    showModal() {
      this.modalVisible = true;
    },
  },
};
</script>

<style scoped></style>
