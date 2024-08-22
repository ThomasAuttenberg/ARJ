<script setup lang="ts">

import CardWithIco from '@/components/molecules/CardWithIco.vue'
import LinkWithIcon from '@/components/molecules/LinkWithIcon.vue'
import RuKazakhMap from '../atoms/icons/DirectionsAndTraffic/RuKazakhMap.vue'
import FlyingBox from '@/components/atoms/icons/DirectionsAndTraffic/FlyingBox.vue'
import BoxLamp from '@/components/atoms/icons/DirectionsAndTraffic/BoxLamp.vue'
import type { IProvidedComponent } from '@/hooks/types'
import PrettyButtonFlexible from '@/components/atoms/PrettyButtonFlexible.vue'
import GeoIcoGrayLight from '../atoms/icons/GeoIcoGrayLight.vue'
import type { Component } from 'vue'
import GeoIcoWhite from '@/components/atoms/icons/GeoIcoWhite.vue'

function getEnumerationComponent(text: string, ico?:Component) : IProvidedComponent {
  return {component: LinkWithIcon, props: {text: text, ico: ico? ico : GeoIcoGrayLight}}
}
const emits = defineEmits(['callModalWindow']);
</script>

<template>
  <div class="directions-and-traffic-container">
    <div class="directions-and-traffic-titles">
      <div class = "directions-and-traffic-titles-title">
        Направления и тарифы
      </div>
      <div class = "directions-and-traffic-titles-subtitle">
        Приоритетные направления грузоперевозок компании «AvtoRail Jet»
      </div>
    </div>
    <div class="directions-and-traffic-cards-container">
      <card-with-ico class="directions-and-traffic-card"
        :title="'Направление зоны охвата услуг - Казахстан и Россия'"
        :subtitle="'Осуществляем скорую доставку сборных грузов до/в'"
        :ico="RuKazakhMap"
        :enumeration="[
          getEnumerationComponent('Казахстан (Алматы)'),
          getEnumerationComponent('Вся территория России'),
        ]"
      />
      <card-with-ico class="directions-and-traffic-card"
                     :title="'Всегда в курсе событий «Рынка грузоперевозок»'"
                     :subtitle="'Предоставляем эксклюзивные предложения своим Заказчикам по режиму доставки'"
                     :ico="FlyingBox"
                     :enumeration="[
        getEnumerationComponent('Экспресс'),
        getEnumerationComponent('Стандарт'),
        getEnumerationComponent('Грузовой')
      ]"
      />
      <card-with-ico class="directions-and-traffic-card last-card"
                     :title="'Персональная логистика для бизнеса'"
                     :subtitle="'Эксклюзивное предложение\nСкорая доставка по направлениям:'"
                     :ico="BoxLamp"
                     :enumeration="[
        getEnumerationComponent('Алматы - Новосибирск за 2 дня', GeoIcoWhite),
        getEnumerationComponent('Алматы - Москва за 5 дней', GeoIcoWhite),
        getEnumerationComponent('Алматы - Казань за 4 дня', GeoIcoWhite),
        getEnumerationComponent('Алматы - Екатеринбург за 4 дня', GeoIcoWhite)
      ]"
      />
      <div class = "directions-and-traffic-card-btn-container">
        <PrettyButtonFlexible class="directions-and-traffic-card-btn" :text="'Оформить заявку'" @click="emits('callModalWindow', $event);"/>
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
.directions-and-traffic-titles{
  padding: 0 20px;
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