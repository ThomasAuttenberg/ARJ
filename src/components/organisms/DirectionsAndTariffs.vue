<script setup lang="ts">

import CardWithIco from '@/components/molecules/CardWithIco.vue'
import LinkWithIcon from '@/components/molecules/LinkWithIcon.vue'
import RuKazakhMap from '../atoms/icons/DirectionsAndTraffic/RuKazakhMap.vue'
import FlyingBox from '@/components/atoms/icons/DirectionsAndTraffic/FlyingBox.vue'
import BoxLamp from '@/components/atoms/icons/DirectionsAndTraffic/BoxLamp.vue'
import type { IProvidedComponent } from '@/hooks/types'
import PrettyButtonFlexible from '@/components/atoms/PrettyButtonFlexible.vue'
import GeoIcoGrayLight from '../atoms/icons/GeoIcoGrayLight.vue'
import { type Component, computed } from 'vue'
import GeoIcoWhite from '@/components/atoms/icons/GeoIcoWhite.vue'
import scrollToCalculations from '@/hooks/UIActions/scrollToCalculations'
import { useLangStore } from '@/stores/lang'

function getEnumerationComponent(text: string, ico?:Component) : IProvidedComponent {
  return {component: LinkWithIcon, props: {text: text, ico: ico? ico : GeoIcoGrayLight}}
}
defineEmits(['callModalWindow']);
const strings = computed(()=> useLangStore().langStrings.DirectionsAndTraffics);

</script>

<template>
  <div class="directions-and-traffic-container">
    <div class="directions-and-traffic-titles">
      <div class = "directions-and-traffic-titles-title">
        {{ strings.title }}
      </div>
      <div class = "directions-and-traffic-titles-subtitle">
        {{ strings.description }}
      </div>
    </div>
    <div class="directions-and-traffic-cards-container">
      <card-with-ico class="directions-and-traffic-card"
        :title="strings.cards[0].title"
        :subtitle="strings.cards[0].subtitle"
        :ico="RuKazakhMap"
        :enumeration="[
          getEnumerationComponent(strings.cards[0].enumeration[0]),
          getEnumerationComponent(strings.cards[0].enumeration[1]),
        ]"
      />
      <card-with-ico class="directions-and-traffic-card"
                     :title="strings.cards[1].title"
                     :subtitle="strings.cards[1].subtitle"
                     :ico="FlyingBox"
      />
      <card-with-ico class="directions-and-traffic-card last-card"
                     :title="strings.cards[2].title"
                     :subtitle="strings.cards[2].subtitle"
                     :ico="BoxLamp"
                     :enumeration="[
        getEnumerationComponent(strings.cards[2].enumeration[0], GeoIcoWhite),
        getEnumerationComponent(strings.cards[2].enumeration[1], GeoIcoWhite),
        getEnumerationComponent(strings.cards[2].enumeration[2], GeoIcoWhite),
        getEnumerationComponent(strings.cards[2].enumeration[3], GeoIcoWhite)
      ]"
      />
      <div class = "directions-and-traffic-card-btn-container">
        <PrettyButtonFlexible class="directions-and-traffic-card-btn" :text="strings.buttonText" @click="scrollToCalculations();"/>
        <PrettyButtonFlexible class="directions-and-traffic-card-btn hidden"/>
        <PrettyButtonFlexible class="directions-and-traffic-card-btn hidden"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.directions-and-traffic-titles{
  align-self: center;
  max-width: 1180px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.directions-and-traffic-titles-title{
  font-weight: 700;
  font-size: 32px;
  text-transform: uppercase;
}
.directions-and-traffic-titles-subtitle{
  font-size: 15px;
  line-height: 140%;
  max-width: 350px;
}
.hidden{
  visibility: hidden;
}
.directions-and-traffic-card-btn-container{
  flex: 100%;
  display: flex;
  gap:20px;
}
.directions-and-traffic-container {
  color: var(--text-color);
  background: white;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 100px 20px;
  justify-content: center;
}
.directions-and-traffic-cards-container{
  max-width: 1180px;
  align-self: center;
  display: flex;
  flex-wrap: wrap; /* Позволяет карточкам переноситься на новую строку */
  gap: 20px; /* Зазор между карточками */
}
.directions-and-traffic-card-btn{
  flex: 1 1 calc(33.333% - 16px);
  min-width: 310px;
  height: 51px;
}
.directions-and-traffic-card {
  flex: 1 1 calc(33.333% - 16px); /* Карточка занимает треть ширины контейнера с учетом отступов */
  min-width: 310px; /* Минимальная ширина карточки */
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  padding: 10px 25px 25px 25px;
}
.directions-and-traffic-card.last-card{
  background: linear-gradient(90deg, #1e5b8a 0%, #326f9e 100%);
  color: white;
  border: none;
}

@media (768px <= width < 1181px) {
  .directions-and-traffic-titles-subtitle{
    align-self: center;
  }
  .directions-and-traffic-card.last-card:deep(.card-with-ico-enumeration-item){
    justify-content: left;

  }
  .directions-and-traffic-card.last-card:deep(.card-with-ico-enumeration){
    width: 310px;
    align-self: center;
  }
  .directions-and-traffic-titles{
    text-align: center;
  }
  .directions-and-traffic-titles-title{
    font-size: 24px;
  }
  .hidden{
    display: none;
  }
  .directions-and-traffic-container{
    padding: 70px 20px;
  }
}
@media (width < 768px) {
  .directions-and-traffic-titles-subtitle{
    align-self: center;
  }
  .hidden{
    display: none;
  }
  .directions-and-traffic-card{
    flex: 100%;
  }
  .directions-and-traffic-titles{
    text-align: center;
  }
  .directions-and-traffic-titles-title{
    font-size: 18px;
  }
  .directions-and-traffic-container{
    padding: 50px 20px;
  }
}
@media (width >= 1010px) {
  .directions-and-traffic-card.last-card:deep(.card-with-ico-enumeration-item){
    justify-content: left;
  }
  .hidden{
    display: block;
  }
}
</style>