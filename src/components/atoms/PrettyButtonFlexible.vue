<script setup lang="ts">

const props = defineProps({
  text: {type: String},
  isLoading: {type: Boolean,default: false},
  isDisabled: {type: Boolean, default: false},
});

function onClick(event: MouseEvent) {
  if(props.isLoading || props.isDisabled) event.stopImmediatePropagation();
}

</script>

<template>
  <button @click="onClick" :class="{ loading: isLoading, disabled: isDisabled }" class="btn">
    {{ text }}
  </button>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
.btn {
  font-family: var(--font-family);
  background-color: var(--btn-color);
  border-radius: 10px;
  border: none;
  padding: 15px 30px;
  font-weight: 600;
  font-size: 15px;
  line-height: 140%;
  color: white;

  transition: background-color 0.4s, content 0.1s;
  box-shadow: 0 15px 20px -10px rgba(241, 157, 0, 0.4);
}
.btn:not(.disabled):hover {
  cursor: pointer;
  background-color: var(--btn-hover-color);
  box-shadow: 0 15px 30px -10px rgba(241, 157, 0, 0.6);
}
.btn.disabled {
  cursor: auto;
  opacity: 0.2;
}
.btn.loading {
  cursor: pointer;
  background-color: var(--btn-hover-color);
  position: relative;
  color: rgba(0, 0, 0, 0);
}
.btn.loading:hover {
  background-color: var(--btn-hover-color);
  cursor: auto;
}
.btn.loading::before {
  width: 30px;
  height: 30px;
  position: absolute;
  top: calc(50% - 15px);
  left: calc(50% - 15px);
  content: url('@/assets/icons/button-loading-ico.svg');
  animation: loading 1s infinite linear;
}
@keyframes loading {
  100% {
    transform: rotate(360deg);
  }
}
</style>