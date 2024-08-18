<script setup lang="ts">

import { onMounted, ref, type VNodeRef, watch } from 'vue'
import { type LngLat, YMap, type YMapLocationRequest, YMapMarker } from 'ymaps3'
import loadScript from '@/hooks/loadScript'


const mapCenter : LngLat = [70.030206, 50.920340];
let map : YMap;
const mapRef = ref<VNodeRef | null>(null);



async function initMap(mapCenter : LngLat, zoom: number) {

  await loadScript("https://api-maps.yandex.ru/v3/?apikey="+import.meta.env.VITE_MAPS_API_KEY+"&lang=ru_RU")

    .catch((error: Error) => {
      console.error("Ошибка при подключении к API. Проверьте ключ и убедитесь, что установлены HTTPReferer-ы в ЛК https://developer.tech.yandex.ru/")
    });

  await ymaps3.ready;
  const LOCATION: YMapLocationRequest = {
    center: mapCenter,
    zoom: zoom,
  };
  const { YMap, YMapDefaultSchemeLayer } = ymaps3;
  map = new YMap(document.getElementById('map') as HTMLElement, { location: LOCATION });
  map.addChild(new YMapDefaultSchemeLayer({}));

  const markerElement = document.createElement('div');
  markerElement.className = 'map-agency-marker';

  const marker = new ymaps3.YMapMarker({
    coordinates: [37.623082, 55.75254]
  },markerElement);

  map.addChild(new ymaps3.YMapDefaultFeaturesLayer({zIndex: 1800}));
  map.addChild(marker);
}


onMounted(() => {
  const width = window.innerWidth;
  let zoom = 4;

  if(width >= 1181){
    zoom = 5;
  }
  initMap(mapCenter, zoom);
})

</script>

<template>
<div class="cities-wrapper">
  <div class = cities-title>
    Города представительства партнеров
  </div>
  <div :ref="mapRef" class="meow" id="map"></div>
</div>
</template>

<style scoped>
:global(.map-agency-marker){
  position: absolute;
  z-index: 99;
  top: -50px;
  right: -16px;
  width: 27px;
  height: 33px;
  background: url("@/assets/icons/geoPin.svg");
}

#map{
  width: 100%;
  height: 400px;
}
.cities-wrapper {
  font-family: var(--font-family);
  color: var(--text-color);
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.cities-title{
  font-weight: 700;
  font-size: 18px;
  text-transform: uppercase;
  text-align: center;
}
@media (768px <= width < 1181px){
  .cities-wrapper {
    padding-top: 70px;
  }
  .cities-title{
    font-size: 24px;
  }
  #map{
    height: 450px;
  }
}
@media (width >= 1181px) {
  .cities-wrapper {
    padding-top: 100px;
    gap: 40px
  }
  .cities-title{
    font-size: 32px;
  }
  #map{
    height: 600px;
  }
}
</style>