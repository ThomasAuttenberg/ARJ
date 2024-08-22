<script setup lang="ts">

import FAQDetails from '@/components/atoms/FAQDetails.vue'
import type { PropType } from 'vue'

defineProps({
  title: {type: String, required: true},
  items: {type: Array as PropType<{title:string, content:string}[]>, required:true}
});

</script>

<template>
  <div class="faq-block-container">
    <div class = "faq-block-content">
    <div class = "faq-block-title">
      {{title}}
    </div>
    <div class = "faq-block-items">
      <div class="faq-block-item" v-for="(item,key) in items" :key>
        <FAQDetails :title="item.title" :content="item.content"/>
        <div v-if="key != items.length-1" class="faq-block-items-divider"/>
      </div>
    </div>
    </div>
  </div>
</template>

<style scoped>
.faq-block-items, .faq-block-item {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.faq-block-items-divider{
  width: 100%;
  height: 1px;
  background: #E0E0E0;
}
.faq-block-container{
  display: flex;
  justify-content: center;
  color: var(--text-color);
  font-size:15px;
}
.faq-block-container:deep(.faq-details-summary){
  font-size:15px;
}
.faq-block-title {
  font-weight: 700;
  font-size: 32px;
  padding: 0 20px;
  text-transform: uppercase;
}
.faq-block-content {
  padding: 100px 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: min(100%, 1180px);
}
@media (768px <= width < 1181px){
  .faq-block-content {
    gap: 30px;
    padding: 70px 20px;
  }
  .faq-block-title {
    font-size: 24px;
    text-align: center;
  }
}
@media (width < 768px) {
  .faq-block-content {
    gap: 30px;
    padding: 50px 20px;
  }
  .faq-block-title {
    font-size: 18px;
    text-align: center;
  }
}
</style>