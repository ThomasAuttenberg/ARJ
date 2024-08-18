<script setup lang="ts">

import PrettyInput from '@/components/atoms/PrettyInput.vue'
import PrettyButton from '@/components/atoms/PrettyButton.vue'
import { onMounted, type PropType, ref, type VNodeRef } from 'vue'
import { emptyValidation, floatValidation, mailValidation, numberValidation, phoneValidation } from '@/hooks/validators'
import type { ModalWindowPropsType } from '@/hooks/types'
import PrettyFileOutput from '@/components/atoms/PrettyFileOutput.vue'
import PrettyFileInpit from '@/components/atoms/PrettyFileInpit.vue'
import { uploadFile } from '@/hooks/API'



const link = import.meta.env.VITE_API_URL + '/download/' + import.meta.env.VITE_TEMPLATE_FILENAME;
const props = defineProps({
  modalWindowProps: {type: Object as PropType<ModalWindowPropsType>}
});
const emit = defineEmits(['escape', 'submit']);
const modalFieldsWindow = ref<VNodeRef | null>(null);
const modalFileWindow = ref<VNodeRef | null>(null);

function onClick(event : MouseEvent){
  if((modalFieldsWindow.value as HTMLDivElement).contains(event.target) || (modalFileWindow.value as HTMLDivElement).contains(event.target) ) {
    event.stopPropagation();
  }else{
    emit('escape');
  }
}
const elements = ref<VNodeRef | null>(null);
onMounted(()=>{
  (elements.value as HTMLElement).focus();
})

interface InputValuesKeys{
  model:string|undefined,
  required?:boolean,
  error?:boolean,
  transform?:Function,
}
const inputsValues = ref<Record<string, InputValuesKeys>>({
  e_mail: {
    model: props.modalWindowProps?.email,
    required: true,
  },
  phone: {
    model: props.modalWindowProps?.phone,
    required: true,
  },
  name: {
    model: props.modalWindowProps?.name,
    required: true,
  },
  cn_fea_code: { model: '', },
  place: { model:'', transform: Number},
  volume: { model: '', transform: Number },
  weight: { model:'', transform: Number},
  city_to: { model: ''},
  city_from: {model:''},
});

const windowNextStep = ref(false);
const submit = ()=>{

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
    return;
  }else{
    windowNextStep.value = true;
  }
};

const fileValidator = (file : File)=>{
  const parts = file.name.split('.');
  const extension : string = parts.length >= 1 ? parts.pop() : '';
  console.log(extension);
  return extension === 'doc' || extension === 'docx';
}
const warningActive = ref(false);
const successActive = ref(false);
const warningNotification = ref<VNodeRef | null>(null);
const successNotification = ref<VNodeRef | null>(null);
const notificationTextContent = ref('');

const sendWarningNotification = (text:string)=>{
  notificationTextContent.value = text;
  warningActive.value = true;
  setTimeout(()=>warningActive.value = false, 2000);
}

const sendSuccessNotification = (text:string)=>{
  notificationTextContent.value = text;
  successActive.value = true;
  setTimeout(()=>successActive.value = false, 2000);
}

const onValidationError = ()=>{
  sendWarningNotification('Ошибка загрузки файла');
}
let uploadedFile : File;
const onFileUpload = (file : File)=>{
  uploadedFile = file;
  sendSuccessNotification('Файл загружен');
}

const finalSubmit = () =>{
  uploadFile(uploadedFile).then(()=>{
    console.log('ок');
  }).catch(err=>{
    sendWarningNotification('Ошибка при отправке запроса');
    console.log(err);
  })
}

</script>

<template>
  <div class = "modal-fields-wrapper" @mousedown="onClick">
    <div class = "modal-fields-warning-notification" :class="{active:warningActive}">{{notificationTextContent}}</div>
      <div class = "modal-fields-notification" :class="{active:successActive}">{{notificationTextContent}}</div>
    <div ref="modalFileWindow" class="modal-file-window" :class="{'next-step':windowNextStep}">
      <div class = "modal-fields-text-description">
        <div class ="text-description-title">
          Расчет стоимости перевозки
        </div>
        <div class ="text-description-text">
          Заполните и прикрепите опись груза для оформления заявки
        </div>
      </div>
      <div class="modal-fields-elements">
        <PrettyFileOutput text="Опись образец" :link/>
        <PrettyFileInpit
          text="Загрузить файл"
          additional-text="(не более 15Mb)"
          text-uploaded="Загрузить другой файл"
          :fileValidator
          @validationError="onValidationError"
          @fileUploaded="onFileUpload"
        />
      </div>
      <PrettyButton class="modal-file-window-btn" text="Оформить заявку" @click="finalSubmit"/>
    </div>

    <div ref="modalFieldsWindow" class="modal-fields-window" :class="{'next-step':windowNextStep}" @click.prevent.stop>

       <div class = "modal-fields-text-description">
         <div class ="text-description-title">
           Расчет стоимости перевозки
         </div>
         <div class ="text-description-text">
           Заполните детали заявки
         </div>
       </div>

      <div ref="elements" class = "modal-fields-elements" @submit.prevent="console.log('meow')">
        <PrettyInput
          v-model:input-val="inputsValues.city_from.model"
          placeholder="Город отправления"/>
        <PrettyInput
          v-model:input-val="inputsValues.city_to.model"
          placeholder="Город получения"/>
        <div class ="modal-fields-elements-inline">
          <PrettyInput
            v-model:input-val="inputsValues.weight.model"
            :validator="floatValidation"
            v-model:input-error="inputsValues.weight.error"
            placeholder="Вес, кг"/>
          <PrettyInput
            v-model:input-val="inputsValues.volume.model"
            :validator="floatValidation"
            v-model:input-error="inputsValues.volume.error"
            placeholder="Объем, м3"/>
        </div>
        <PrettyInput
          v-model:input-val="inputsValues.place.model"
          :validator="numberValidation"
          v-model:input-error="inputsValues.place.error"
          placeholder="Количество мест, шт"/>
        <PrettyInput
          v-model:input-val="inputsValues.cn_fea_code.model"
          placeholder="Код ТН ВЭД"/>
        <PrettyInput
          v-model:input-val="inputsValues.name.model"
          v-model:input-error="inputsValues.name.error"
          v-model:validator="emptyValidation"
          placeholder="Ваше имя*"/>

        <PrettyInput
          v-model:input-val="inputsValues.phone.model"
          :validator="phoneValidation"
          v-model:input-error="inputsValues.phone.error"
          placeholder="Телефон*"/>
        <PrettyInput
          v-model:input-val="inputsValues.e_mail.model"
          :validator="mailValidation"
          v-model:input-error="inputsValues.e_mail.error"
          placeholder="Почта*"/>
        <PrettyButton text="Далее" @click="submit"/>
      </div>

    </div>
  </div>
</template>

<style scoped>
.modal-fields-warning-notification, .modal-fields-notification{
  position: fixed;
  top: -100%;
  text-align: center;
  align-content: center;
  background: #EE182C;
  color: white;
  padding: 20px;
  border-radius: 10px;
  transition: 0.5s;
}
.modal-fields-notification{
  background: #F8D122;
}
.modal-fields-notification.active, .modal-fields-warning-notification.active{
  top: 20px;
  transition: 0.5s;
}
.modal-file-window-btn{
  width: 100%;
}
.modal-file-window{
  display: none;
  padding: 30px;
  border-radius: 20px;
  max-width: 400px;
  text-align: center;
  background: white;
  gap: 20px;
  flex-direction: column;

}
.modal-file-window.next-step{
  animation: appearing 1s ease-out;
  display: flex;
}
.modal-fields-elements{
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.modal-fields-elements:deep(.input){
  min-width: unset;
}
.modal-fields-elements:deep(.input):focus,
.modal-fields-elements:deep(.input-wrapper:not(.error):hover),
.modal-fields-elements:deep(.input-wrapper.error > .input){
  outline: none;
}
.modal-fields-elements-inline{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 10px;
}
.text-description-title{
  font-size: 20px;
  font-weight: 600;
  line-height: 130%;
}
.text-description-text{
  font-size: 15px;
  line-height: 140%;
}
.modal-fields-text-description{
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 10px;
}
@keyframes changeColor {
  0%{
    background: rgba(0,0,0,0.1);
  }
  100%{
    background: rgba(0,0,0,0.7);
  }
}
.modal-fields-wrapper{
  animation: changeColor 1s;
  background: rgba(0,0,0,0.7);
  top: 0;
  position: fixed;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  width: 100vw;
  height: calc(100*var(--vh,vh));
  z-index: 99;
}
@keyframes appearing {
  0%{
    margin-top: -50vh;
  }
  80%{
    margin-top: 0;
  }
}
.modal-fields-window{
  animation: appearing 0.4s ease-out;
  width: clamp(350px, 400px, 80vw);
  max-height: calc(90*var(--vh,vh));
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 20px;
  padding: 30px;
  gap: 30px
}
@keyframes disappearing{
  0%{
    display: unset;
    margin-bottom: 0;
  }
  100%{
    display: unset;
    margin-bottom: calc(-200vh);
  }
}
.modal-fields-window.next-step{
  display: none;
}

</style>