<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <textarea></textarea>

        <div class="modal-footer">
          <slot name="footer">
            default footer
            <button class="modal-default-button btn" @click="$emit('close')">
              Сохранить
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <template>
  <form>
    <textarea></textarea>
    <button>Сохранить</button>
  </form>
</template> -->
