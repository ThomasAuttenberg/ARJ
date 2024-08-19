<script setup lang="ts">

import type { Component, PropType } from 'vue'
import type {IProvidedComponent} from '@/hooks/types'

defineProps({
  ico: {type: Object as PropType<Component>, required:true},
  title: {type: String, required: true},
  subtitle: {type: String, required: true},
  enumeration: {type: Array as PropType<IProvidedComponent[]>}
});


</script>

<template>
  <div class = "card-with-ico-wrapper">
    <component class="card-with-ico-ico" :is="ico"/>
    <div class = "card-with-ico-title">{{ title }}</div>
    <div class = "card-with-ico-subtitle">{{ subtitle }}</div>
    <div class = "card-with-ico-enumeration">
      <component class="card-with-ico-enumeration-item"
                 v-for="(comp,key) in enumeration"
                 :key :is="comp.component"
                 v-bind="comp.props"
                 v-on="Object(comp.eventListeners)"/>
    </div>
  </div>
</template>

<style scoped>
.card-with-ico-enumeration{
  display: flex;
  flex-direction: column;
  gap:7px;
}
.card-with-ico-ico{
  align-self: center;
}
.card-with-ico-title{
  white-space: pre-line;
  font-weight: 600;
  font-size: 20px;
  line-height: 130%;
  text-align: center;
}
.card-with-ico-subtitle{
  white-space: pre-line;
  font-weight: 400;
  font-size: 15px;
  line-height: 140%;
  text-align: center;
}
.card-with-ico-wrapper{
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px 25px 25px;
}
</style>