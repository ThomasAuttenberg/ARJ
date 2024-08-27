<script setup lang="ts">

import PrettyButtonFlexible from '@/components/atoms/PrettyButtonFlexible.vue'
import scrollToCalculations from '@/hooks/UIActions/scrollToCalculations'
import { computed } from 'vue'
import { useLangStore } from '@/stores/lang'

const strings = computed(()=> useLangStore().langStrings.IntroductionImage);
</script>

<template>
  <div class="mainImageContainer">
    <div class="mainImageContent">
      <div class="mainImageContent-title">
        {{ strings?.title }}
      </div>
      <div class = "mainImageContent-desc">
        {{ strings?.description }}
      </div>
      <div class="mainImageContent-button">
        <PrettyButtonFlexible :text="strings?.buttonText" @click="scrollToCalculations()"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mainImageContent-button{
  display: flex;
  justify-content: center;
  margin: 30px auto;
}
.mainImageContent-desc{
  text-align: center;
  width: 650px;
  margin: 10px auto;
  line-height: 140%;
}
.mainImageContent-title{
  width: 100%;
  padding-top: 100px;
  text-transform: uppercase;
  text-align: center;
  font-weight: 800;
  font-size: 40px;
}
.mainImageContent{
  color: var(--text-color);;
  padding-left: 20px;
  padding-right: 20px;
  font-family: var(--font-family);
  font-size: 15px;
  margin: auto;
  width: 100%;
  height: 665px;
  background: url('@/assets/images/eurasionMap.png') center no-repeat;
  background-size: contain;
}
.mainImageContent::after{
  content: url('@/assets/images/eurasionMap.png') url('@/assets/images/eurasionMap-mobile.png');
  position:absolute; width:0; height:0; overflow:hidden; z-index:-1;
}
.mainImageContainer{
  container-type: inline-size;
  width: 100%;
}
@media (768px <= width < 1181px){
  .mainImageContent-title{
    font-size: 32px;
    padding-top: 70px;
    width: 100%;
  }
  .mainImageContent{
    width: 100%;
    height: 650px;
    background: url('@/assets/images/eurasionMap-mobile.png') bottom no-repeat;
    background-size: contain;
  }
}
@media (width < 768px) {
  .mainImageContent-title{
    font-size: 22px;
    padding-top: 50px;
  }
  .mainImageContent-desc{
    width: 100%;
  }
  .mainImageContent{
    width: 100%;
    height: 657px;
    background: url('@/assets/images/eurasionMap-mobile.png') center center no-repeat;
    background-size: cover;
  }
}
</style>