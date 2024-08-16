<script setup lang="ts">

import CardWithIco from '@/components/molecules/CardWithIco.vue'
import PhoneIco from '@/components/atoms/icons/PhoneIco.vue'
import LinkWithIcon from '@/components/molecules/LinkWithIcon.vue'
import GeoIco from '@/components/atoms/icons/GeoIco.vue'
import type IProvidedComponent from '@/hooks/IProvidedComponent'
import Button from '@/components/atoms/Button.vue'
import RuKazakhMap from '../atoms/icons/DirectionsAndTraffic/RuKazakhMap.vue'
import FlyingBox from '@/components/atoms/icons/DirectionsAndTraffic/FlyingBox.vue'
import BoxLamp from '@/components/atoms/icons/DirectionsAndTraffic/BoxLamp.vue'

function getEnumerationComponent(text: string) : IProvidedComponent {
  return {component: LinkWithIcon, props: {text: text, ico: GeoIco}}
}

</script>

<template>
  <div class="directions-and-traffic-container">
    <div class="directions-and-traffic-titles">
      <div class = "directions-and-traffic-titles-title">
        Направления и тарифы
      </div>
      <div class = "directions-and-traffic-titles-subtitle">
        Приоритетные направления грузоперевозок компании "АРД"
      </div>
    </div>
    <div class="directions-and-traffic-cards-container">
      <card-with-ico class="directions-and-traffic-card"
        :title="'Направление зоны охвата услуг - Казахстан и Россия'"
        :subtitle="'Осуществляем скорую доставку сборных грузов до/в'"
        :ico="RuKazakhMap"
        :enumeration="[
          getEnumerationComponent('мяу'),
          getEnumerationComponent('мур'),
          getEnumerationComponent('кусь')
        ]"
      />
      <card-with-ico class="directions-and-traffic-card"
                     :title="'Направление зоны охвата услуг - Казахстан и Россия'"
                     :subtitle="'Осуществляем скорую доставку сборных грузов до/в'"
                     :ico="FlyingBox"
                     :enumeration="[
        getEnumerationComponent('мяу'),
        getEnumerationComponent('мур'),
        getEnumerationComponent('кусь')
      ]"
      />
      <card-with-ico class="directions-and-traffic-card last-card"
                     :title="'Направление зоны охвата услуг - Казахстан и Россия'"
                     :subtitle="'Осуществляем скорую доставку сборных грузов до/в'"
                     :ico="BoxLamp"
                     :enumeration="[
        getEnumerationComponent('мяу'),
      ]"
      />
      <div class = "directions-and-traffic-card-btn-container">
        <Button class="directions-and-traffic-card-btn" :text="'Оформить заявку'"/>
        <Button class="directions-and-traffic-card-btn hidden"/>
        <Button class="directions-and-traffic-card-btn hidden"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.directions-and-traffic-titles{
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
  color: #3F4657;
}
.directions-and-traffic-titles-subtitle{
  font-size: 15px;
  line-height: 140%;
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
  font-family: var(--font-family);
  color: #3F4657;
  background: white;
  display: flex;
  flex-wrap: wrap; /* Позволяет карточкам переноситься на новую строку */
  gap: 40px; /* Зазор между карточками */
  padding: 100px 20px;
  justify-content: center;
}
.directions-and-traffic-cards-container{
  max-width: 1180px;
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
  .directions-and-traffic-card.last-card:deep(.card-with-ico-enumeration-item){
    justify-content: center;
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
</style>