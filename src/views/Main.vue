<script setup lang="ts">

import IntroductionImage from '@/components/organisms/IntroductionImage.vue'
import DirectionsAndTariffs from '@/components/organisms/DirectionsAndTariffs.vue'
import FAQBlock from '@/components/organisms/FAQBlock.vue'
import TransportCalculationBlock from '@/components/organisms/TransportCalculationBlock.vue'

const a = 'Города представительства партнеров указаны <span style="color:#0000ff">здесь</span>';

</script>

<template>
  <div>
    <IntroductionImage/>
    <DirectionsAndTariffs/>
    <FAQBlock
      title="Часто задаваемые вопросы"
      :items = "[
        {title:'Где передать груз к перевозке?', content:a},
        {title:'Как и где производить оплату за перевозку?', content:'Оплата за перевозку взимается до, или после фактически оказанной услуги, по предварительному согласованию Сторон и отражено в документе подписанном Сторонами'},
      ]"
    />
    <TransportCalculationBlock/>
  </div>
</template>

<style scoped>

</style>