<script setup lang="ts">

import ByteTransitLogo from '@/components/atoms/icons/ByteTransitLogo.vue'
import PrettyButtonFlexible from '@/components/atoms/PrettyButtonFlexible.vue'
import { useLangStore } from '@/stores/lang'
import { computed } from 'vue'

const strings = computed(()=> useLangStore().langStrings.PartnershipBalk);

</script>

<template>
<div class = "p-balk-wrapper">
  <div class = "p-balk-content">
    <div class="p-balk-title">
      {{strings.officialPartner}}
    </div>
    <div class="p-balk-right-block">
      <div class="p-balk-logo">
        <ByteTransitLogo class="p-balk-logo-logo"/>
      </div>
      <div class="p-balk-link-button">
        <a href="https://www.sibtrans.ru/route-kazakhstan/">
        <PrettyButtonFlexible class="p-balk-link-button-button" :text="strings.buttonText"/>
        </a>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.p-balk-wrapper{
  width: 100%;
  background: var(--darkgray);
}
.p-balk-content{
  max-width: 1180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 20px;
  gap: 20px;
}
.p-balk-right-block{
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  width: 100%;
}
.p-balk-title{
  align-content: center;
  font-weight: 700;
  font-size: 18px;
  text-transform: uppercase;
  color: white;
}
.p-balk-logo{
  display: flex;
  justify-content: center;
}
.p-balk-logo-logo{
  width: 120px;
  height: 88px;
}
.p-balk-link-button-button{
  width: 100%;
}
@media (width >= 768px){
  .p-balk-link-button{
    padding-top: 10px;
  }
  .p-balk-link-button-button{
    width: 185px;
  }
  .p-balk-content{
    padding: 20px 20px 30px 20px;
    width: clamp(0px, 1180px, 1180px);
    flex-direction: row;
    justify-content: space-between;
  }
  .p-balk-title{
    font-size: 24px;
    height: 100%;
    padding-top: 10px;
  }
  .p-balk-right-block{
    flex-direction: row;
    align-items: center;
    width: fit-content;
    gap: 30px;
  }
  .p-balk-wrapper{
    display: flex;
    justify-content: center;
  }
}
@media (width >= 1181px){
  .p-balk-title{
    font-size: 32px;
  }
}
</style>