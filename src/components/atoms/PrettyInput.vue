<script setup lang="ts">

import { computed, onMounted, type PropType, ref, type VNodeRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import { IMask } from 'vue-imask'

type Validator = (val: string|undefined) => boolean;

interface IValidator {
  validator: Validator,
  errorText?: string,
}

const props = defineProps({
  inputId: {type: String},
  placeholder: {type: String, required: false, default: ''},
  validator: {type: Object as PropType<IValidator>},
  inputError: {type: Boolean, default: false},
  type : {type: String},
  title: {type: String},
  mask: {type: String},
})



const inputTitle = computed(()=>{
  return props.title ? props.title : props.placeholder
})

const isFocus = ref(false)
const inputVal = defineModel<string>('inputVal')
const isComplete  = ref(Boolean(inputVal.value?.length))
const isError = defineModel<boolean>('inputError')
isError.value = false
const inptRef = ref<VNodeRef | null>(null)

const mistakeTextShowing = computed(()=> isError.value && isComplete.value);

const validate = (value:string|undefined)=>{
  if(props.validator) {
    isError.value = !props.validator.validator(value)
  }
  isComplete.value = !!value?.length
}

const maskOptions = {
  mask: props.mask, // Пример маски для телефонного номера
};

// Создаем объект маски
const iMaskObject = props.mask ? IMask.createMask(maskOptions) : null;

// Функция для форматирования значения
const formatPhoneNumber = (input: string)=>{
  if(iMaskObject) {
    iMaskObject.resolve(input);
    return iMaskObject.value;
  }
  return null;
}


watch(inputVal, (value)=>{
  if(value && iMaskObject){
    inputVal.value = formatPhoneNumber(value) as unknown as string;
  }
  validate(value)
})
onMounted(()=>{
  validate(inputVal.value);
})

function onRemovalBtnClick(){
  inputVal.value = '';

  setTimeout(()=>{(inptRef.value as HTMLInputElement).focus();});
}

function setCursorToEnd(event: Event) {
  const target = event.target as HTMLInputElement
  setTimeout(() => {
    target.setSelectionRange(target.value.length, target.value.length)
    target.scrollLeft = target.scrollWidth
  })
}

</script>

<template>
  <div class="input-top-wrapper">
    <div class = "input-wrapper" :class="{focus:isFocus, error:isError, complete:isComplete}">
      <span v-if="isFocus || isComplete" class = "additionalPlaceholder">{{inputTitle}}</span>
      <input :id="inputId" :type ref = "inptRef" class="input" v-model="inputVal" :placeholder="!isFocus ? placeholder : ''"
             @focusin="isFocus = true; setCursorToEnd($event)"
             @focusout="isFocus = false;" />

      <span v-if="isComplete" class = "valRemoval" @click="onRemovalBtnClick"></span>
    </div>
    <span v-show="mistakeTextShowing" class="input-input-mistake-text">{{ validator?.errorText }}</span>
  </div>
</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

.input-wrapper.focus > .additionalPlaceholder, .input-wrapper.complete > .additionalPlaceholder {
  position: absolute;
  font-size: 12px;
  font-weight: 400;
  color: #c2c2c2;
  left: 25px;
  top: 5px;
}
@keyframes mistakeText {
  0%{
    height: 0;
    opacity: 0;
  }
  100%{
    height: 10px;
    opacity: 1;
  }
}
.input-input-mistake-text{
  font-weight: 400;
  font-size: 12px;
  color: #ff4747;
  animation: mistakeText .5s;
}

.input-wrapper{
  position: relative;
  padding: 1px;
}
.input{
  font-family: var(--font-family);
  min-width:220px;
  width: 100%;
  padding: 15px 35px 15px 25px;
  font-weight: 400;
  font-size: 15px;
  letter-spacing: 0;
  text-align: left;
  border-radius: 10px;
  border: 0;
  height: 49px;
  background: #f5f5f5;
}
.input-wrapper.error > .input{

  outline: 1px solid #FF4747;
  border-radius: 10px;
}
.input::placeholder{
  color: #c2c2c2;
}
.input:focus, .input-wrapper.complete > .input{
  text-overflow: ellipsis;
  padding: 25px 35px 15px 25px;
}
.input:focus{
  outline: none;
}

.valRemoval{
  width: 30px;
  height: 30px;
  position: absolute;
  right: 10px;
  top: 10px;
  background: url("@/assets/icons/valRemoval.svg") no-repeat 100% 100%;
}
.valRemoval:hover{
  cursor: pointer;
}
</style>