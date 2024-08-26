<script setup lang="ts">

import PrettyInput from '@/components/atoms/PrettyInput.vue'
import { emptyValidation, mailValidation, phoneValidation } from '@/hooks/validators'
import { computed, ref } from 'vue'
import PrettyButtonFlexible from '@/components/atoms/PrettyButtonFlexible.vue'
import type { InputValuesKeys } from '@/hooks/types'
import { createOrder } from '@/hooks/API'
import type { AxiosError } from 'axios'
import { getCISCityMask, getPhoneMask } from '@/hooks/masks'
import { useLangStore } from '@/stores/lang'

const emits = defineEmits(['callModalWindow','warningNotificationRequest','successNotificationRequest']);


const inputsValues = ref<Record<string, InputValuesKeys>>({
  e_mail: {
    model: '',
    required: true,
    error: false,
    showResUntilOk: false,
  },
  phone: {
    model: '',
    required: true,
    error: false,
    showResUntilOk: false,
  },
  name: {
    model: '',
    required: true,
    error: false,
    showResUntilOk: false,
  },
});

function callModalWindow(){
  emits('callModalWindow',{ name: inputsValues.value.name.model, phone:inputsValues.value.phone.model, email:inputsValues.value.e_mail.model, });
}
const buttonLoadingEffect=ref(false);
const submit = ()=>{

  const onVerifyEnd = (object:Record<string,any>)=>{
    buttonLoadingEffect.value = true;
    createOrder(object).then(()=>{
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
      value.showResUntilOk = true;
      return;
    }
    if(value.model)
      submitObject[key] = value.transform ? value.transform(value.model) : value.model;
  });
  if(!hasError){
    onVerifyEnd(submitObject);
  }
};

const strings = computed(()=> useLangStore().langStrings.TransportCalculationBlock);

</script>

<template>
<div class="transport-calculation-block">
  <div class="transport-calculation-block-text">
    <div class="transport-calculation-block-title">
      {{ strings.title }}
    </div>
    <div class="transport-calculation-block-subtitle">
      {{ strings.subtitle }}
    </div>
  </div>
  <div class = "transport-calculation-block-form-wrapper">
    <div class="transport-calculation-block-form">
      <div class = "transport-calculation-block-inputs">
        <PrettyInput input-id="transport-calculation-name"
                     v-model:input-val="inputsValues.name.model"
                     :mask="getCISCityMask()"
                     :validator="{validator:emptyValidation, errorText:strings.inputs[0].errorText}"
                     v-model:input-error="inputsValues.name.error"
                     v-model:turn-validate-until-correct="inputsValues.name.showResUntilOk"
                     class="transport-calculation-block-form-input"
                     :placeholder="strings.inputs[0].placeholder"/>
        <PrettyInput input-id="transport-calculation-phone"
                     :validator="{validator:phoneValidation, errorText:strings.inputs[1].errorText}"
                     v-model:input-val="inputsValues.phone.model"
                     v-model:input-error="inputsValues.phone.error"
                     v-model:turn-validate-until-correct="inputsValues.phone.showResUntilOk"
                     class="transport-calculation-block-form-input"
                     :placeholder="strings.inputs[1].placeholder"
                     :mask="getPhoneMask()"
                     :title="strings.inputs[1].title" />
        <PrettyInput input-id="transport-calculation-email"
                     :validator="{validator: mailValidation, errorText:strings.inputs[2].errorText}"
                     v-model:input-val="inputsValues.e_mail.model"
                     v-model:input-error="inputsValues.e_mail.error"
                     v-model:turn-validate-until-correct="inputsValues.e_mail.showResUntilOk"
                     class="transport-calculation-block-form-input"
                     :placeholder="strings.inputs[2].placeholder"/>
      </div>
      <div>
        <span style="margin-right: 5px">+</span>
        <a class="transport-calculations-details" @click="callModalWindow">{{ strings.specifyButton }}</a>
      </div>
      <PrettyButtonFlexible :is-loading="buttonLoadingEffect" :text="strings.buttonText" @click="submit"/>
    </div>
    <div class = "policy-accepting-text">
      {{strings.policyAccepting[0]}}
      «<RouterLink class="policy-accepting-text-link" to="/policy">{{ strings.policyAccepting[1] }}</RouterLink>»
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
  max-width: 330px;
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

.transport-calculation-block-text{
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  gap:20px;
  padding: 0 20px;
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