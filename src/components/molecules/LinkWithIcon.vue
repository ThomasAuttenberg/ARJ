<script setup lang="ts">
import type { Component, PropType } from 'vue'

const props = defineProps({
  ico: {type: Object as PropType<Component>, required: true},
  text: {type: String, required: true},
  link: {type: String},
})
</script>

<template>
<div class = "ico-with-link-label">
  <component class="ico-with-link-label-ico" :is=ico></component>
  <a class="ico-with-link-label-label" :href="link">{{ text }}</a>
</div>
</template>

<style scoped>

  .ico-with-link-label{
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .ico-with-link-label > a{
    text-decoration: none;
    align-self: center;
  }
  .ico-with-link-label-ico{
    text-wrap: nowrap;
    flex: none;
  }
</style>