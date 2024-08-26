<script setup lang="ts">
const props = defineProps({
  size: {type:Number, default: 30}
})
const size = props.size + 'px';
</script>

<template>
  <div class="flag-flag-us">
  </div>
</template>

<style scoped>
.flag-flag-us{
  width: v-bind(size);
  height: v-bind(size);
  background: url("@/assets/icons/LangSelector/RUFlag.svg");
  background-size: cover;
}
</style>