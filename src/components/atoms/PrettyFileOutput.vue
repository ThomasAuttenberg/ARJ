<script setup lang="ts">

import FileIco from '@/components/atoms/icons/FileIco.vue'
import DownloadIco from '@/components/atoms/icons/DownloadIco.vue'

defineProps({
  text: String,
  link: String,
})

</script>

<template>
<div class = "file-output-wrapper">
  <div class = "file-output-left-block">
    <FileIco class="file-output-left-ico"/>
    <div>{{text}}</div>
  </div>
  <div class = "file-output-right-element">
    <a :href="link"><DownloadIco/></a>
  </div>
</div>
</template>

<style scoped>
.file-output-wrapper{
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #e8eff5;
}
.file-output-left-block{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.file-output-left-ico{
  width: 30px;
  height: 30px;
}
.file-output-right-element{
  width: 30px;
  height: 30px;
}
</style>