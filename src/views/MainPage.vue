<script setup lang="ts">

import IntroductionImage from '@/components/organisms/IntroductionImage.vue'
import DirectionsAndTariffs from '@/components/organisms/DirectionsAndTariffs.vue'
import FAQBlock from '@/components/organisms/FAQBlock.vue'
import TransportCalculationBlock from '@/components/organisms/TransportCalculationBlock.vue'
import AgenciesCities from '@/components/organisms/AgenciesCities.vue'
import { computed, type PropType } from 'vue'
import type { ModalWindowPropsType } from '@/hooks/types'
import PartnershipBalk from '@/components/organisms/PartnershipBalk.vue'
import { useLangStore } from '@/stores/lang'
defineProps({
  modalWindowShowing: {type: Boolean},
  modalWindowProps: {type: Object as PropType<ModalWindowPropsType>}
})
const emits = defineEmits(['watchingElement', 'exitModalWindow','callModalWindow','modalWindowSubmit', 'successNotificationRequest', 'warningNotificationRequest']);
const fd = (index:number) => {emits('watchingElement',index)}

const strings = computed(()=> useLangStore().langStrings.FAQBlock);

</script>

<template>
  <div>
    <IntroductionImage id="main" v-intersection="[fd,0]"/>
    <DirectionsAndTariffs id="directions" v-intersection="[fd,1]" @callModalWindow="emits('callModalWindow', $event);"/>
    <PartnershipBalk/>
    <FAQBlock id="faq" v-intersection="[fd,2]"
      :title="strings.title"
      :items="[
        {title:strings.items[0].title, content:strings.items[0].content},
        {title:strings.items[1].title, content:strings.items[1].content},
        {title:strings.items[2].title, content:strings.items[2].content},
        {title:strings.items[3].title, content:strings.items[3].content},
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