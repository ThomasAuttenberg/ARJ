<script setup lang="ts">

import { computed, onMounted, type PropType, ref, type VNodeRef, watch } from 'vue'
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
  title: {type: String},
  mask: {type: Object as PropType<any>},
})

const inputTitle = computed(()=>{
  return props.title ? props.title : props.placeholder
})
//=================================================================================================
const validationMode = defineModel('turnValidateUntilCorrect');
/*

     If v-model:turnValidateUntilCorrect is unset: input sets itself into the warning mode if any
     typed symbol doesn't pass the validator.
     If v-model:turnValidateUntilCorrect value is false: input doesn't provide any warning
     If v-model:turnValidateUntilCorrect value is true: input waits til inputValue passed validator
     and sets false on v-model value
 */

const inputVal = defineModel<string>('inputVal')
const isError = defineModel<boolean>('inputError') //shows if input text doesn't pass the validator
isError.value = false
//================================================================================================

const isFocus = ref(false)
const isComplete  = ref(Boolean(inputVal.value?.length))
const inptRef = ref<VNodeRef | null>(null)

const mistakeTextShowing = computed(()=> {
  return (validationMode.value || typeof validationMode.value == 'undefined') && isError.value;
});

const validate = (value:string|undefined)=>{
  if(props.validator) {
    isError.value = !props.validator.validator(value);
    if(!isError.value && validationMode.value){validationMode.value = false;}
  }
}

const maskOptions = props.mask;

// Input mask
const iMaskObject = props.mask ? IMask.createMask(maskOptions) : null;

const getMaskedValue = (input: string)=>{
  if(iMaskObject) {
    iMaskObject.resolve(input);
    return iMaskObject.value;
  }
  return null;
}

watch(inputVal, (value)=>{
  if(value && iMaskObject){
    inputVal.value = getMaskedValue(value) as unknown as string;
  }
  validate(inputVal.value)
  isComplete.value = !!value?.length
})

onMounted(()=>{
  validate(inputVal.value);
})

// Cross click
function onRemovalBtnClick(){
  inputVal.value = '';
  setTimeout(()=>{(inptRef.value as HTMLInputElement).focus();});
}

// Any click on input makes cursor be set on the contained text end pos
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
    <div class = "input-wrapper" :class="{focus:isFocus, error:isError && mistakeTextShowing, complete:isComplete}">
      <span v-if="isFocus || isComplete" class = "additionalPlaceholder">{{inputTitle}}</span>
      <input :id="inputId" ref = "inptRef" class="input" v-model="inputVal" :placeholder="!isFocus ? placeholder : ''"
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
    opacity: 0;
  }
  100%{
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