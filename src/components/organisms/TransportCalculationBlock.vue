<script setup lang="ts">

import PrettyInput from '@/components/atoms/PrettyInput.vue'
import { mailValidation, phoneValidation } from '@/hooks/validators'
import { ref } from 'vue'
import PrettyButtonFlexible from '@/components/atoms/PrettyButtonFlexible.vue'
import type { InputValuesKeys } from '@/hooks/types'
import { createOrder } from '@/hooks/API'
import type { AxiosError, AxiosResponse } from 'axios'

const emits = defineEmits(['callModalWindow','warningNotificationRequest','successNotificationRequest']);


const inputsValues = ref<Record<string, InputValuesKeys>>({
  e_mail: {
    model: '',
    required: true,
  },
  phone: {
    model: '',
    required: true,
  },
  name: {
    model: '',
    required: true,
  },
});

function callModalWindow(){
  emits('callModalWindow',{ name: inputsValues.value.name.model, phone:inputsValues.value.phone.model, email:inputsValues.value.e_mail.model, });
}
const buttonLoadingEffect=ref(false);
const submit = ()=>{

  const onVerifyEnd = (object:Record<string,any>)=>{
    buttonLoadingEffect.value = true;
    createOrder(object).then((res:AxiosResponse)=>{
      emits('callModalWindow', {success:true});
    }).catch((err : AxiosError)=>{
      emits('warningNotificationRequest', 'Ошибка при отправке данных!');
      console.error("Ошибка при загрузке файла: " + err.message);
    }).finally(()=>{
      buttonLoadingEffect.value=false;
    });
  }

  let hasError = false;
  const submitObject:Record<string, any> = {};
  Object.entries(inputsValues.value).forEach(([key, value]) => {
    if(value.error || (!value.model && value.required)){
      hasError = true;
      if(!value.error) value.error = true;
      return;
    }
    if(value.model)
      submitObject[key] = value.transform ? value.transform(value.model) : value.model;
  });
  if(hasError){
    emits('successNotificationRequest', 'Корректно заполните все поля');
  }else{
    onVerifyEnd(submitObject);
  }
};


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
        <PrettyInput input-id="transport-calculation-name" v-model:input-val="inputsValues.name.model" class="transport-calculation-block-form-input" placeholder="Ваше имя"/>
        <PrettyInput input-id="transport-calculation-phone" :validator="phoneValidation" v-model:input-val="inputsValues.phone.model" class="transport-calculation-block-form-input" placeholder="+7 (xxx) xxx xx xx"/>
        <PrettyInput input-id="transport-calculation-email" :validator="mailValidation" v-model:input-val="inputsValues.e_mail.model" class="transport-calculation-block-form-input" placeholder="Почта"/>
      </div>
      <div>
        <span style="margin-right: 5px">+</span>
        <a class="transport-calculations-details" @click="callModalWindow">Уточнить детали заявки</a>
      </div>
      <PrettyButtonFlexible :is-loading="buttonLoadingEffect" text="Заказать грузоперевозку" @click="submit"/>
    </div>
    <div class = "policy-accepting-text">
      Нажимая кнопку, Вы соглашаетесь с
      «<RouterLink class="policy-accepting-text-link" to="/policy">Политикой по обработке персональных данных</RouterLink>»
    </div>
  </div>
</div>
</template>

<style scoped>
.policy-accepting-text-link{
  text-decoration: none;
  color: var(--blue)
}
.transport-calculations-details{
  cursor: pointer;
  text-decoration: underline;
}
.policy-accepting-text{
  color: #909090;
  padding-top: 10px;
  font-size: 12px;
  text-align: center;
  width: 280px;
  margin: auto;
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
.transport-calculations-details{
  font-size: 15px;
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
  background: white;
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  gap: 40px;
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