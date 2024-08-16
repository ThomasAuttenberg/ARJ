<script setup lang="ts">
import type { Component, PropType } from 'vue'

const props = defineProps({
  ico: {type: Object as PropType<Component>, required: true},
  text: {type: String, required: true}
})
</script>

<template>
<div class = "ico-with-link-label">
  <component :is=ico></component>
  <p>{{ text }}</p>
</div>
</template>

<style scoped>
  .ico-with-link-label{
    display: flex;
    gap: 5px;
  }
  .ico-with-link-label > p{
    align-self: center;
  }
</style>