<script setup lang="ts">

import PrettyInput from '@/components/atoms/PrettyInput.vue'
import { ref, watch } from 'vue'
const name = ref<string>();
watch(name, ()=>{
  console.log(name.value);
})
</script>

<template>
<div class="transport-calculation-block">
  <div class="transport-calculation-block-text">
    <div class="transport-calculation-block-title">
      мур
    </div>
    <div class="transport-calculation-block-subtitle">
      мяу
    </div>
  </div>
  <div class="transport-calculation-block-form">
    <PrettyInput v-model:input-val="name" class="transport-calculation-block-form-input" placeholder="Ваше имя"/>
    <PrettyInput class="transport-calculation-block-form-input" placeholder="ваше имя"/>
    <PrettyInput class="transport-calculation-block-form-input" placeholder="ваше имя"/>
  </div>
</div>
</template>

<style scoped>
.transport-calculation-block-form-input{
  width: 100%;
}
.transport-calculation-block-title{
  font-weight: 700;
  font-size: 18px;
  text-transform: uppercase;
}
.transport-calculation-block-subtitle{
  font-size: 15px;
}
.transport-calculation-block-form{
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap:10px;
  justify-content: center;
}
.transport-calculation-block-text{
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  gap:40px;
}
.transport-calculation-block{
  background: white;
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
}
@media (768px <= width) {
  .transport-calculation-block{
    padding: 70px 0;
  }
  .transport-calculation-block-form{
    flex-direction: row;
  }
  .transport-calculation-block-form-input{
    width: clamp(236px, 280px, 280px);
  }
}
@media (width >= 1181px){
  .transport-calculation-block{
    padding: 100px 0;
  }
}
</style>