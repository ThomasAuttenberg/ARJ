<script setup lang="ts">

import PrettyInput from '@/components/atoms/PrettyInput.vue'
import PrettyButton from '@/components/atoms/PrettyButton.vue'

const name = defineModel<string>('mew');
const phone = defineModel<string>('phone');
const email = defineModel<string>('email');

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
        <PrettyInput v-model:input-val="name" class="transport-calculation-block-form-input" placeholder="Ваше имя"/>
        <PrettyInput v-model:input-val="phone" class="transport-calculation-block-form-input" placeholder="+7 (xxx) xxx xx xx"/>
        <PrettyInput v-model:input-val="email" class="transport-calculation-block-form-input" placeholder="Почта"/>
      </div>
      <div>
        <span style="margin-right: 5px">+</span>
        Уточнить детали заявки
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