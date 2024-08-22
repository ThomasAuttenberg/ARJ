<script setup lang="ts">

import PrettyInput from '@/components/atoms/PrettyInput.vue'
import { type PropType, ref, type VNodeRef } from 'vue'
import {
  cityValidation,
  emptyValidation,
  floatValidation,
  mailValidation,
  numberValidation,
  phoneValidation, placesValidation, TNCodeValudation, volumeValidation, weightValidation
} from '@/hooks/validators'
import type { InputValuesKeys, ModalWindowPropsType } from '@/hooks/types'
import PrettyFileOutput from '@/components/atoms/PrettyFileOutput.vue'
import PrettyFileInput from '@/components/atoms/PrettyFileInput.vue'
import { createOrder, uploadFile } from '@/hooks/API'
import type { AxiosError, AxiosResponse } from 'axios'
import PrettyButtonFlexible from '@/components/atoms/PrettyButtonFlexible.vue'
import CloseWIndowCross from '@/components/atoms/icons/CloseWIndowCross.vue'


const fileSizeLimit = 16000000;
const link = import.meta.env.VITE_API_URL + '/download/' + import.meta.env.VITE_TEMPLATE_FILENAME;
const props = defineProps({
  modalWindowProps: {type: Object as PropType<ModalWindowPropsType>}
});

const emit = defineEmits(['escape', 'submit', 'successNotificationRequest', 'warningNotificationRequest']);
const modalFieldsWindow = ref<VNodeRef | null>(null);
const modalFileWindow = ref<VNodeRef | null>(null);
const modalSuccessWindow = ref<VNodeRef | null>(null);

function onClick(event : MouseEvent){
  if((modalFieldsWindow.value as HTMLDivElement).contains(event.target as HTMLElement)
    || (modalFileWindow.value as HTMLDivElement).contains(event.target as HTMLElement)
    || (modalSuccessWindow.value as HTMLDivElement).contains(event.target as HTMLElement) ) {
    event.stopPropagation();
  }else{
    emit('escape');
  }
}
const elements = ref<VNodeRef | null>(null);

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

let finalOrderObject : Record<string,any> = {};
const successStep = ref(Boolean(props.modalWindowProps?.success));
const windowNextStep = ref(successStep.value);
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
    emit('successNotificationRequest','Корректно заполните указанные поля');
  }else{
    windowNextStep.value = true;
    finalOrderObject = submitObject;
  }
};


const fileValidator = (file : File)=>{
  const parts = file.name.split('.');
  const extension : string = parts.length >= 1 ? parts.pop() as string : '';
  return file.size <= fileSizeLimit && (extension === 'doc' || extension === 'docx');
}

const onValidationError = ()=>{
  emit('warningNotificationRequest','Ошибка загрузки файла: поддерживаемые форматы .docx, .doc. Размер файла: до 15Mb', 5000);
}

let uploadedFile : File;
const onFileUpload = (file : File)=>{
  uploadedFile = file;
  emit('successNotificationRequest','Файл загружен');
}

const buttonLoadingEffect = ref(false);
const finalSubmit = async () =>{
  buttonLoadingEffect.value=true;
  if(uploadedFile) {
    await uploadFile(uploadedFile).then((res: AxiosResponse) => {
      finalOrderObject['file_path'] = res.data['file_path'] as string;
    }).catch((err: AxiosError) => {
      emit('warningNotificationRequest', 'Ошибка при отправке файла! Файл проигнорирован');
      console.error("Ошибка при загрузке файла: " + err.message);
    });
  }
  createOrder(finalOrderObject).then((res:AxiosResponse)=>{
    successStep.value = true;
  }).catch((err : AxiosError)=>{
    emit('warningNotificationRequest', 'Ошибка при отправке заявки!');
    console.error("Ошибка при отправке заказа: " + err.message);
  }).finally(()=>{
    buttonLoadingEffect.value=false;
  })
}


</script>

<template>
  <div class = "modal-fields-wrapper" @mousedown="onClick">

    <div ref="modalSuccessWindow" class="modal-success-window" :class="{'success-step': successStep}">
      <CloseWIndowCross class="modal-window-close-cross" @click="emit('escape')"/>
      <div class = "modal-fields-text-description">
        <div class ="text-description-title">
          Заявка успешно оформлена
        </div>
        <div class ="text-description-text">
          В ближайшее время с вами свяжутся наши менеджеры
        </div>
      </div>
      <RouterLink to="/" ><PrettyButtonFlexible style="width:100%" text="Вернуться на главную" @click="emit('escape');"/></RouterLink>
    </div>


    <div ref="modalFileWindow" class="modal-file-window" :class="{'next-step':windowNextStep,'success-step':successStep}">
      <CloseWIndowCross class="modal-window-close-cross" @click="emit('escape')"/>
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
        <PrettyFileInput
          text="Загрузить файл"
          additional-text="(не более 15Mb)"
          text-uploaded="Загрузить другой файл"
          :fileValidator
          @validationError="onValidationError"
          @fileUploaded="onFileUpload"
        />
      </div>
      <PrettyButtonFlexible :is-loading="buttonLoadingEffect" class="modal-file-window-btn" text="Оформить заявку" @click="finalSubmit"/>
    </div>

    <div ref="modalFieldsWindow" class="modal-fields-window" :class="{'next-step':windowNextStep,'success-step':successStep}" @click.prevent.stop>
      <CloseWIndowCross class="modal-window-close-cross" @click="emit('escape')"/>
       <div class = "modal-fields-text-description">
         <div class ="text-description-title">
           Расчет стоимости перевозки
         </div>
         <div class ="text-description-text">
           Заполните детали заявки
         </div>
       </div>

      <div ref="elements" class = "modal-fields-elements" @submit.prevent>
        <PrettyInput
          v-model:input-val="inputsValues.city_from.model"
          :validator="{validator: cityValidation, errorText:'Название города должно быть введено на кириллице'}"
          v-model:input-error="inputsValues.city_from.error"
          placeholder="Город отправления"/>
        <PrettyInput
          v-model:input-val="inputsValues.city_to.model"
          placeholder="Город получения"
          :validator="{validator: cityValidation, errorText:'Название города должно быть введено на кириллице'}"
          v-model:input-error="inputsValues.city_to.error"/>
        <div class ="modal-fields-elements-inline">
          <PrettyInput
            v-model:input-val="inputsValues.weight.model"
            :validator="{validator: weightValidation, errorText:'Целое или дробное число (не более 2 цифр после точки)'}"
            v-model:input-error="inputsValues.weight.error"
            placeholder="Вес, кг"/>
          <PrettyInput
            v-model:input-val="inputsValues.volume.model"
            :validator="{validator:volumeValidation,errorText:'Целое или дробное число (не более 3 цифр после точки)'}"
            v-model:input-error="inputsValues.volume.error"
            placeholder="Объем, м3"/>
        </div>
        <PrettyInput
          v-model:input-val="inputsValues.place.model"
          :validator="{validator:placesValidation,errorText:'Число, менее 1млн'}"
          v-model:input-error="inputsValues.place.error"
          placeholder="Количество мест, шт"/>
        <PrettyInput
          v-model:input-val="inputsValues.cn_fea_code.model"
          :validator="{validator:TNCodeValudation, errorText:'Десять цифр'}"
          v-model:input-error="inputsValues.cn_fea_code.error"
          placeholder="Код ТН ВЭД"/>
        <PrettyInput
          v-model:input-val="inputsValues.name.model"
          v-model:input-error="inputsValues.name.error"
          :validator="{validator:emptyValidation}"
          placeholder="Ваше имя*"/>

        <PrettyInput
          v-model:input-val="inputsValues.phone.model"
          mask="+{7}(000)000-00-00"
          :validator="{validator:phoneValidation}"
          v-model:input-error="inputsValues.phone.error"
          placeholder="Телефон*" />
        <PrettyInput
          v-model:input-val="inputsValues.e_mail.model"
          :validator="{validator:mailValidation, errorText:'Адрес почтового ящика введен некорректно'}"
          v-model:input-error="inputsValues.e_mail.error"
          placeholder="Почта*"/>
        <PrettyButtonFlexible text="Далее" @click="submit"/>
      </div>

    </div>
  </div>
</template>

<style scoped>
.modal-window-close-cross{
  position: absolute;
  top: 10px;
  right: 10px;
}
.modal-file-window-btn{
  width: 100%;
}
.modal-file-window, .modal-success-window{
  position: relative;
  display: none;
  padding: 30px;
  border-radius: 20px;
  max-width: 400px;
  text-align: center;
  background: white;
  gap: 20px;
  flex-direction: column;

}

.modal-file-window.next-step, .modal-success-window.success-step{
  animation: appearing 1s ease-out;
  display: flex;
}
.modal-file-window.success-step{
  display: none;
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

.modal-fields-elements::-webkit-scrollbar{
  width: 5px;
  padding: 2px;
}
.modal-fields-elements::-webkit-scrollbar-thumb {
  width: 5px;
  background: rgba(0, 0, 0, 0.09);
  border-radius: 100px;
}
.modal-fields-elements::-webkit-scrollbar-track{
  width: 5px;
  background: #f8f8f8;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 100px;
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
  position: relative;
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