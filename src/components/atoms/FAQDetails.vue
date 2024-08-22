<script setup lang="ts">

import DetailsIcoClosed from '@/components/atoms/icons/DetailsIcoClosed.vue'
import DetailsIcoOpened from '@/components/atoms/icons/DetailsIcoOpened.vue'
import { ref, watch } from 'vue'

defineProps({
  title: {type: String, required: true},
  content: {type: String, required: true}
});

const isOpened = ref<boolean | undefined>(undefined);

</script>

<template>
  <div class = "faq-details-container">
    <details class = "faq-details-details" @toggle="isOpened = !isOpened">
      <summary class="faq-details-summary">
        <DetailsIcoOpened class="faq-details-ico" v-show="isOpened"/>
        <DetailsIcoClosed class="faq-details-ico" v-show="!isOpened"/>
        {{title}}
      </summary>
      <div class = "faq-details-content" v-html="content"></div>
    </details>
  </div>
</template>

<style scoped>
.faq-details-content{
  padding-top: 10px;
}
.faq-details-ico{
  position: absolute;
  left: 0;
}
.faq-details-container {
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 40px;
}
.faq-details-details{
  line-height: 140%;
  width: 100%;
}
.faq-details-summary{
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  line-height: 130%;
  min-height: 20px;
  list-style: none;
}
.faq-details-summary::-webkit-details-marker {
  display: none;
}
</style>