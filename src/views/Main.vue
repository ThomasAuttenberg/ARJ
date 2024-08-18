<script setup lang="ts">

import IntroductionImage from '@/components/organisms/IntroductionImage.vue'
import DirectionsAndTariffs from '@/components/organisms/DirectionsAndTariffs.vue'
import FAQBlock from '@/components/organisms/FAQBlock.vue'
import TransportCalculationBlock from '@/components/organisms/TransportCalculationBlock.vue'
import AgenciesCities from '@/components/organisms/AgenciesCities.vue'
import PrettyFooter from '@/components/organisms/PrettyFooter.vue'

const a = 'Города представительства партнеров указаны <span style="color:#0000ff">здесь</span>';
const emits = defineEmits(['watchingElement']);
const fd = (index:number) => {emits('watchingElement',index)}
</script>

<template>
  <div>
    <IntroductionImage id="main" v-intersection="[fd,0]"/>
    <DirectionsAndTariffs id="directions" v-intersection="[fd,1]"/>
    <FAQBlock id="faq" v-intersection="[fd,2]"
      title="Часто задаваемые вопросы"
      :items = "[
        {title:'Где передать груз к перевозке?', content:a},
        {title:'Как и где производить оплату за перевозку?', content:'Оплата за перевозку взимается до, или после фактически оказанной услуги, по предварительному согласованию Сторон и отражено в документе подписанном Сторонами'},
      ]"
    />
    <TransportCalculationBlock/>
    <AgenciesCities id="agencies" v-intersection="[fd,3]"/>
    <PrettyFooter/>
  </div>
</template>

<style scoped>

</style>