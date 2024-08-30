<script setup lang="ts">

import PrettyInput from '@/components/atoms/PrettyInput.vue'
import { computed, type PropType, ref, type VNodeRef } from 'vue'
import {
  cityValidation,
  emptyValidation,
  mailValidation,
  phoneValidation, placesValidation, TNCodeValidation, volumeValidation, weightValidation
} from '@/hooks/InputUtills/validators'
import type { InputValuesKeys, ModalWindowPropsType } from '@/hooks/types'
import PrettyFileOutput from '@/components/atoms/PrettyFileOutput.vue'
import PrettyFileInput from '@/components/atoms/PrettyFileInput.vue'
import { createOrder, uploadFile } from '@/hooks/API'
import type { AxiosError, AxiosResponse } from 'axios'
import PrettyButtonFlexible from '@/components/atoms/PrettyButtonFlexible.vue'
import CloseWIndowCross from '@/components/atoms/icons/CloseWIndowCross.vue'
import {
  getCISCityMask,
  getIntegerMask,
  getNumberMask,
  getPhoneMask,
  getTNCodeMask,
} from '@/hooks/InputUtills/masks'
import { useLangStore } from '@/stores/lang'
import FileUploadErrorCross from '@/components/atoms/icons/FileUploadErrorCross.vue'
import FileUploadOkTick from '@/components/atoms/icons/FileUploadOkTick.vue'
import BackArrow from '@/components/atoms/icons/BackArrow.vue'


const strings = computed(()=> useLangStore().langStrings.ModalFieldsWindow);

const fileSizeLimit = 16000000;
//template download link:
const link = import.meta.env.VITE_API_URL + '/download/' + import.meta.env.VITE_TEMPLATE_FILENAME;

const props = defineProps({
  modalWindowProps: {type: Object as PropType<ModalWindowPropsType>}
});
const emit = defineEmits(['escape', 'submit', 'successNotificationRequest', 'warningNotificationRequest']);

const modalFieldsWindow = ref<VNodeRef | null>(null);
const modalFileWindow = ref<VNodeRef | null>(null);
const modalSuccessWindow = ref<VNodeRef | null>(null);

// watch for clicks to know if modal window needs to be hidden
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
    showResUntilOk: false,
  },
  phone: {
    model: props.modalWindowProps?.phone,
    required: true,
    showResUntilOk: false,
  },
  name: {
    model: props.modalWindowProps?.name,
    required: true,
    showResUntilOk: false,
  },
  cn_fea_code: { model: '', showResUntilOk: false,},
  place: { model:'', transform: Number, showResUntilOk: false,},
  volume: { model: '', transform: Number, showResUntilOk: false, },
  weight: { model:'', transform: Number, showResUntilOk: false,},
  city_to: { model: '', showResUntilOk: false,},
  city_from: {model:'', showResUntilOk: false,},
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
      value.showResUntilOk = true;
      return;
    }
    if(value.model)
      submitObject[key] = value.transform ? value.transform(value.model) : value.model;
  });
  if(!hasError){
    windowNextStep.value = true;
    finalOrderObject = submitObject;
  }
};

// Provides into fileInput element
const fileValidator = (file : File)=>{
  const parts = file.name.split('.');
  const extension : string = parts.length >= 1 ? parts.pop() as string : '';
  return file.size <= fileSizeLimit && (extension === 'doc' || extension === 'docx');
}

const filename = ref('');
const uploadState = ref<boolean | null>(null);

// Calls when fileInput returns validation error
const onValidationError = (file: File)=>{
  filename.value = file.name;
  emit('warningNotificationRequest',strings.value.fileErrorNotification, 5000);
  uploadState.value = false;
}

let uploadedFile : File;
// Calls when fileInput returns upload success (no validation error)
const onFileUpload = (file : File)=>{
  filename.value = file.name;
  uploadedFile = file;
  emit('successNotificationRequest',strings.value.fileSuccessNotification);
  uploadState.value = true;
}

const buttonLoadingEffect = ref(false);

// When user creates order: loading file on server, getting the link and sets in the order object
const finalSubmit = async () =>{
  buttonLoadingEffect.value=true;
  if(uploadedFile) {
    await uploadFile(uploadedFile).then((res: AxiosResponse) => {
      finalOrderObject['file_path'] = res.data['file_path'] as string;
    }).catch((err: AxiosError) => {
      emit('warningNotificationRequest', strings.value.sendFileError);
      console.error("Ошибка при загрузке файла: " + err.message);
    });
  }
  createOrder(finalOrderObject).then(()=>{
    successStep.value = true;
  }).catch((err : AxiosError)=>{
    emit('warningNotificationRequest', strings.value.orderError);
    console.error("Ошибка при отправке заказа: " + err.message);
  }).finally(()=>{
    buttonLoadingEffect.value=false;
  })
}

// Interpolation filename in locale string:

const interpolate =  (template:string, variables:Record<string, any>) => {
  return template.replace(/\${(.*?)}/g, (_, key) => variables[key.trim()]);
}

const uploadSuccessLabelString = computed(()=>{
  return interpolate(strings.value.fileSuccessLabel, {filename: filename.value})
})
const uploadErrorLabelString = computed(()=>{
  return interpolate(strings.value.fileErrorLabel, {filename: filename.value})
})

</script>

<template>
  <div class = "modal-fields-wrapper" @mousedown="onClick">

    <div ref="modalSuccessWindow" class="modal-success-window" :class="{'success-step': successStep}">
      <CloseWIndowCross class="modal-window-close-cross" @click="emit('escape')"/>
      <div class = "modal-fields-text-description">
        <div class ="text-description-title">
          {{ strings.orderSuccessTitle }}
        </div>
        <div class ="text-description-text">
          {{ strings.orderSuccessText }}
        </div>
      </div>
      <RouterLink to="/" ><PrettyButtonFlexible style="width:100%" :text="strings.successButtonText" @click="emit('escape');"/></RouterLink>
    </div>


    <div ref="modalFileWindow" class="modal-file-window" :class="{'next-step':windowNextStep,'success-step':successStep}">
      <BackArrow class="modal-window-close-cross" @click="windowNextStep = false;"/>
      <div class = "modal-fields-text-description">
        <div class ="text-description-title">
          {{ strings.fileWindowTitle }}
        </div>
        <div class ="text-description-text">
          {{ strings.fileWindowSubtitle }}
        </div>
      </div>
      <div class="modal-fields-elements">
        <PrettyFileOutput :text="strings.fileDownloadText" :link/>
        <div class="modal-fields-pretty-file-input-subpart">
          <PrettyFileInput
            :text="strings.fileUploadText"
            :additional-text="strings.fileUploadHint"
            :text-uploaded="strings.fileUploadAnother"
            :fileValidator
            @validationError="onValidationError"
            @fileUploaded="onFileUpload"
          />
          <div v-show="uploadState === false" class="modal-fields-upload-error-label">
          <FileUploadErrorCross/>
            {{ uploadErrorLabelString }}
          </div>
          <div v-show="uploadState" class="modal-fields-upload-success-label">
          <FileUploadOkTick/>
            {{ uploadSuccessLabelString }}
          </div>
        </div>
      </div>
      <PrettyButtonFlexible :is-loading="buttonLoadingEffect" class="modal-file-window-btn" :text="strings.fileButtonText" @click="finalSubmit"/>
    </div>

    <div ref="modalFieldsWindow" class="modal-fields-window" :class="{'next-step':windowNextStep,'success-step':successStep}" @click.prevent.stop>
      <CloseWIndowCross class="modal-window-close-cross" @click="emit('escape')"/>
       <div class = "modal-fields-text-description">
         <div class ="text-description-title">
           {{ strings.fieldsWindowTitle }}
         </div>
         <div class ="text-description-text">
           {{ strings.fieldsSubtitle }}
         </div>
       </div>

      <div ref="elements" class = "modal-fields-elements" @submit.prevent>
        <PrettyInput
          v-model:input-val="inputsValues.city_from.model"
          :validator="{validator: cityValidation, errorText:strings.fieldsInputs[0].errorText}"
          v-model:input-error="inputsValues.city_from.error"
          :mask="getCISCityMask()"
          v-model:turn-validate-until-correct="inputsValues.city_from.showResUntilOk"
          :placeholder="strings.fieldsInputs[0].placeholder"/>
        <PrettyInput
          v-model:input-val="inputsValues.city_to.model"
          :placeholder="strings.fieldsInputs[1].placeholder"
          :validator="{validator: cityValidation, errorText:strings.fieldsInputs[1].errorText}"
          :mask="getCISCityMask()"
          v-model:turn-validate-until-correct="inputsValues.city_to.showResUntilOk"
          v-model:input-error="inputsValues.city_to.error"/>
        <div class ="modal-fields-elements-inline">
          <PrettyInput
            v-model:input-val="inputsValues.weight.model"
            :validator="{validator: weightValidation, errorText:strings.fieldsInputs[2].errorText}"
            v-model:input-error="inputsValues.weight.error"
            v-model:turn-validate-until-correct="inputsValues.weight.showResUntilOk"
            :mask="getNumberMask(2,6)"
            :placeholder="strings.fieldsInputs[2].placeholder"/>
          <PrettyInput
            v-model:input-val="inputsValues.volume.model"
            :validator="{validator:volumeValidation,errorText:strings.fieldsInputs[3].errorText}"
            v-model:input-error="inputsValues.volume.error"
            v-model:turn-validate-until-correct="inputsValues.volume.showResUntilOk"
            :mask="getNumberMask(3,6)"
            :placeholder="strings.fieldsInputs[3].placeholder"/>
        </div>
        <PrettyInput
          v-model:input-val="inputsValues.place.model"
          :mask="getIntegerMask(1,999999)"
          :validator="{validator:placesValidation,errorText:strings.fieldsInputs[4].errorText}"
          v-model:input-error="inputsValues.place.error"
          v-model:turn-validate-until-correct="inputsValues.place.showResUntilOk"
          :placeholder="strings.fieldsInputs[4].placeholder"/>
        <PrettyInput
          v-model:input-val="inputsValues.cn_fea_code.model"
          :mask="getTNCodeMask()"
          :validator="{validator:TNCodeValidation, errorText:strings.fieldsInputs[5].errorText}"
          v-model:input-error="inputsValues.cn_fea_code.error"
          v-model:turn-validate-until-correct="inputsValues.cn_fea_code.showResUntilOk"
          :placeholder="strings.fieldsInputs[5].placeholder"/>
        <PrettyInput
          v-model:input-val="inputsValues.name.model"
          v-model:input-error="inputsValues.name.error"
          :mask="getCISCityMask()"
          :validator="{validator:emptyValidation, errorText:strings.fieldsInputs[6].errorText}"
          v-model:turn-validate-until-correct="inputsValues.name.showResUntilOk"
          :placeholder="strings.fieldsInputs[6].placeholder"/>

        <PrettyInput
          v-model:input-val="inputsValues.phone.model"
          :mask="getPhoneMask()"
          :validator="{validator:phoneValidation, errorText:strings.fieldsInputs[7].errorText}"
          v-model:input-error="inputsValues.phone.error"
          v-model:turn-validate-until-correct="inputsValues.phone.showResUntilOk"
          :placeholder="strings.fieldsInputs[7].placeholder" />
        <PrettyInput
          v-model:input-val="inputsValues.e_mail.model"
          :validator="{validator:mailValidation, errorText:strings.fieldsInputs[8].errorText}"
          v-model:input-error="inputsValues.e_mail.error"
          v-model:turn-validate-until-correct="inputsValues.e_mail.showResUntilOk"
          :placeholder="strings.fieldsInputs[8].placeholder"/>
        <PrettyButtonFlexible :text="strings.fieldsButtonText" @click="submit"/>
      </div>

    </div>
  </div>
</template>

<style scoped>

.modal-fields-upload-error-label, .modal-fields-upload-success-label{
  width: 100%;
  display: flex;
  align-content: flex-start;
  align-items: center;
  font-weight: 400;
  font-size: 12px;
  color: var(--gray);
}

.modal-window-close-cross{
  position: absolute;
  top: 10px;
  left: 10px;
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
.modal-file-window.next-step{
  animation: appearing 0.5s ease-out;
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