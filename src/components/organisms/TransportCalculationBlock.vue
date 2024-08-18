<script setup lang="ts">

import PrettyInput from '@/components/atoms/PrettyInput.vue'
import PrettyButton from '@/components/atoms/PrettyButton.vue'
import { mailValidation, phoneValidation } from '@/hooks/validators'
import { ref } from 'vue'

const name = defineModel<string>('mew');
const phone = defineModel<string>('phone');
const email = defineModel<string>('email');
const emits = defineEmits(['callModalWindow']);
function callModalWindow(){
  emits('callModalWindow',{ name:name.value, phone:phone.value, email:email.value, });
}


</script>

<template>
<div class="transport-calculation-block">
  <div class="transport-calculation-block-text">
    <div class="transport-calculation-block-title">
      Расчет стоимости перевозки
    </div>
    <div class="transport-calculation-block-subtitle">
      Оставьте заявку на расчет стоимости и наш менеджер свяжется с Вами
    </div>
  </div>
  <div class = "transport-calculation-block-form-wrapper">
    <div class="transport-calculation-block-form">
      <div class = "transport-calculation-block-inputs">
        <PrettyInput input-id="transport-calculation-name" v-model:input-val="name" class="transport-calculation-block-form-input" placeholder="Ваше имя"/>
        <PrettyInput input-id="transport-calculation-phone" :validator="phoneValidation" v-model:input-val="phone" class="transport-calculation-block-form-input" placeholder="+7 (xxx) xxx xx xx"/>
        <PrettyInput input-id="transport-calculation-email" :validator="mailValidation" v-model:input-val="email" class="transport-calculation-block-form-input" placeholder="Почта"/>
      </div>
      <div>
        <span style="margin-right: 5px">+</span>
        <a class="transport-calculations-details" @click="callModalWindow">Уточнить детали заявки</a>
      </div>
      <PrettyButton text="Заказать грузоперевозку"/>
    </div>
    <div class = "policy-accepting-text">
      Нажимая кнопку, Вы соглашаетесь с «Политикой по обработке персональных данных»
    </div>
  </div>
</div>
</template>

<style scoped>
.transport-calculations-details{
  cursor: pointer;
  text-decoration: underline;
}
.policy-accepting-text{
  padding-top: 10px;
  font-size: 12px;
  text-align: center;
  width: 280px;
  margin: auto;
}
.transport-calculation-block-form-wrapper{

}
.transport-calculation-block-form{
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: center;
}
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
  width: 330px;
}
.transport-calculation-block-inputs{
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap:10px;
  justify-content: center;
  width: 100%;
}
.transport-calculation-block-inputs:deep(.input-wrapper.error > .input){
  outline: none;
}
.transport-calculation-block-text{
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  gap:20px;
}
.transport-calculation-block{
  color: var(--text-color);
  font-family: var(--font-family);
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
  .transport-calculation-block-title{
    font-size: 24px;
  }
  .transport-calculation-block-inputs{
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
  .transport-calculation-block-title{
    font-size: 32px;
  }
}
</style>