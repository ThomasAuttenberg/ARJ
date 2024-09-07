<script setup lang="ts">

import { computed } from 'vue'
import { useLangStore } from '@/stores/lang'

const strings = computed(()=> useLangStore().langStrings.OfferPage);
</script>

<template>
  <div class="wrapper-wrapper">
    <div class = "wrapper">
      <h1>{{strings?.title}}</h1>
      <div class = "content-block" v-html="strings?.html">
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper-wrapper {
  display: flex;
  background: white;
  width: 100%;
  justify-content: center;
  min-height: calc(100vh - 226px - 50px);
}
.wrapper{
  flex:1fr;
  width: clamp(0px, 1180px, 1180px);
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  font-family: var(--font-family);
  color: var(--text-color);
}
:deep(h1){
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
}
:deep(h2){
  font-size: 15px;
  font-weight: 600;
  padding-top: 20px;
}
:deep(p){
  padding-top: 20px;
  line-height: 140%;
  font-size: 14px
}
:deep(ol){
  padding-left: 20px;
}
:deep(ol > li){
  font-weight: bold;
}
:deep(ul){
  display: block;
  padding-left: 20px;
  padding-top: 20px;
  line-height: 140%;
  font-size: 14px;
}
@media (width >=768px){
  .wrapper-wrapper{
    min-height: calc(100vh - 113px - 153px);
  }
  :deep(h1){
    font-size: 24px;
  }
  :deep(h2){
    padding-top: 30px;
  }
  .wrapper{
    padding: 70px 20px;
  }
}
@media(width >= 1181px) {
  .wrapper-wrapper {
    min-height: calc(100vh - 132px - 153px);
  }
  :deep(h1){
    font-size: 32px;
  }
  :deep(h2){
    padding-top: 40px;
  }
  .wrapper{
    padding: 100px 20px;
  }
}
</style>