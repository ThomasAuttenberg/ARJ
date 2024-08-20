<script setup lang="ts">
import { ref } from 'vue'

const notificationTextContent = ref<string>('');
const activeClass = ref(false);
let timeout : number | null = null;
const sendNotification = (text:string, delay?:number)=>{
  const delay_ = delay || 2000;
  notificationTextContent.value = text;
  activeClass.value = true;
  if(timeout){  clearTimeout(timeout); }
  timeout = setTimeout(()=>{activeClass.value = false; timeout=null}, delay_);
}
defineExpose({sendNotification});

</script>

<template>
  <div class = "modal-fields-notification" :class="{active:activeClass}">{{notificationTextContent}}</div>
</template>

<style scoped>
.modal-fields-notification{
  z-index: 999;
  position: fixed;
  top: -100%;
  text-align: center;
  align-content: center;
  color: white;
  padding: 20px;
  max-width: 30vw;
  border-radius: 10px;
  transition: 0.5s;
}
@media (width <= 767px) {
  .modal-fields-notification{
    max-width: 80%;
  }
}
.modal-fields-notification.active{
  top: 20px;
  transition: 0.5s;
}
</style>