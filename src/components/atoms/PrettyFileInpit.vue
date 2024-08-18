<script setup lang="ts">

import { type PropType, ref, type VNodeRef } from 'vue'

const props = defineProps({
  text: {type: String, required: true},
  textUploaded: String,
  additionalText: String,
  fileValidator: Function as PropType<(File)=>boolean>
});
const emit = defineEmits(['validationError', 'fileUploaded'])
const input = ref<VNodeRef | null>(null);
const shadowInput = ref<VNodeRef | null>(null);
const fileUploaded = ref(false);
let uploadedFile;
function onFileChange(){
  if((shadowInput.value as HTMLInputElement).files[0]){
    uploadedFile = (shadowInput.value as HTMLInputElement).files[0];
    console.log(uploadedFile);
    if(props.fileValidator){
      if(props.fileValidator(uploadedFile)){
        fileUploaded.value = true;
        emit('fileUploaded');
      }else{
        fileUploaded.value = false;
        (shadowInput.value as HTMLInputElement).value = '';
        emit('validationError');
      }
    }else{
      fileUploaded.value = true;
      emit('fileUploaded', uploadedFile);
    }
    if(!props.textUploaded){
      (input as HTMLLabelElement).textContent = (shadowInput.value as HTMLInputElement).files[0].name;
    }
  }
}
</script>

<template>
<div class = "pretty-file-input-wrapper">
  <input ref="shadowInput" id="pretty-file-input-input-id" type="file" class = "pretty-file-input-upload-input" @change="onFileChange" hidden/>
  <label ref="input" class="pretty-file-input-custom-file-input" for="pretty-file-input-input-id" v-text="fileUploaded ? textUploaded : text"/>
  <p v-if="additionalText">{{additionalText}}</p>
</div>
</template>

<style scoped>
.pretty-file-input-custom-file-input{
  cursor: pointer;
  color: #3B85BE;
  height: 20px;
}
.pretty-file-input-wrapper{
  font-size: 14px;
  padding: 15px 20px;
  display: flex;
  align-content: center;
  justify-content: center;
  background: #e8eff5;
  gap: 10px;
}
</style>