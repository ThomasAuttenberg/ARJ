<script setup lang="ts">

import IntroductionImage from '@/components/organisms/IntroductionImage.vue'
import DirectionsAndTariffs from '@/components/organisms/DirectionsAndTariffs.vue'
import FAQBlock from '@/components/organisms/FAQBlock.vue'
import TransportCalculationBlock from '@/components/organisms/TransportCalculationBlock.vue'
import AgenciesCities from '@/components/organisms/AgenciesCities.vue'
import ModalFieldsWindow from '@/components/organisms/ModalFieldsWindow.vue'
import { type PropType, ref } from 'vue'
import type { ModalWindowPropsType } from '@/hooks/types'

const props = defineProps({
  modalWindowShowing: {type: Boolean},
  modalWindowProps: {type: Object as PropType<ModalWindowPropsType>}
})
console.log(props.modalWindowShowing);
const a = 'Города представительства партнеров указаны <span style="color:#0000ff">здесь</span>';
const emits = defineEmits(['watchingElement', 'exitModalWindow','callModalWindow','modalWindowSubmit']);
const fd = (index:number) => {emits('watchingElement',index)}

const modalFieldsWindowResult = ref<Record<string, any>>({});

function onModalFieldsWindowSubmit(val:Record<string, any>){
  modalFieldsWindowResult.value = val;
  emits("exitModalWindow",val)
}
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
    <TransportCalculationBlock @callModalWindow="emits('callModalWindow', $event);"/>
    <AgenciesCities id="agencies" v-intersection="[fd,3]"/>
    <ModalFieldsWindow v-if="modalWindowShowing" :modalWindowProps="modalWindowProps" @escape="emits('exitModalWindow')" @submit="onModalFieldsWindowSubmit"/>
  </div>
</template>

<style scoped>

</style>