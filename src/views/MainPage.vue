<script setup lang="ts">

import IntroductionImage from '@/components/organisms/IntroductionImage.vue'
import DirectionsAndTariffs from '@/components/organisms/DirectionsAndTariffs.vue'
import FAQBlock from '@/components/organisms/FAQBlock.vue'
import TransportCalculationBlock from '@/components/organisms/TransportCalculationBlock.vue'
import AgenciesCities from '@/components/organisms/AgenciesCities.vue'
import { type PropType } from 'vue'
import type { ModalWindowPropsType } from '@/hooks/types'
import PartnershipBalk from '@/components/atoms/PartnershipBalk.vue'
const props = defineProps({
  modalWindowShowing: {type: Boolean},
  modalWindowProps: {type: Object as PropType<ModalWindowPropsType>}
})
const contentWithLink = 'Города представительства партнеров указаны <a class="decorated-link" href="/#agencies">здесь</a>';
const emits = defineEmits(['watchingElement', 'exitModalWindow','callModalWindow','modalWindowSubmit', 'successNotificationRequest', 'warningNotificationRequest']);
const fd = (index:number) => {emits('watchingElement',index)}


</script>

<template>
  <div>
    <IntroductionImage id="main" v-intersection="[fd,0]"/>
    <DirectionsAndTariffs id="directions" v-intersection="[fd,1]" @callModalWindow="emits('callModalWindow', $event);"/>
    <PartnershipBalk/>
    <FAQBlock id="faq" v-intersection="[fd,2]"
      title="Часто задаваемые вопросы"
      :items = "[
        {title:'Где передать груз к перевозке?', content:contentWithLink},
        {title:'Как и где производить оплату за перевозку?', content:'Оплата за перевозку взимается до, или после фактически оказанной услуги, по предварительному согласованию Сторон и отражено в документе подписанном Сторонами'},
        {title: 'Застрахован ли груз?', content:'Компания «AvtoRail Jet» несет полную материальную ответственность за вверенное имущество и принятые на себя обязательства, в рамках действующего законодательства Республики Казахстан и Российской Федерации'},
        {title: 'Какой пакет документов требуется к перевозке?',content:'Для физических лиц - опись перевозимого груза; CMR; СНТ; код ТН ВЭД (в случае отсутствия данных документов, компания “AvtoRail Jet” содействует в формировании пакета документов).\n'+
'</br>Для юридических лиц - CMR; Invoice; ЭСФ; копия договора на поставку; разрешение на вывоз (в случае ограничений)'},
      ]"
    />
    <TransportCalculationBlock id="calculation-block"
      @callModalWindow="emits('callModalWindow', $event);"
      @successNotificationRequest="emits('successNotificationRequest',$event)"
      @warningNotificationRequest="emits('warningNotificationRequest',$event)"
    />
    <AgenciesCities id="agencies" v-intersection="[fd,3]"/>
  </div>
</template>

<style scoped>

</style>