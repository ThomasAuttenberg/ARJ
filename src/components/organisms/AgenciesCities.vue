<script setup lang="ts">

import { onMounted, ref, type VNodeRef} from 'vue'
import { type LngLat, type YMapLocationRequest} from 'ymaps3'
import loadScript from '@/hooks/loadScript'
import { getCoordinates } from '@/hooks/API'
import type { AxiosError } from 'axios'


const mapCenter : LngLat = [70.030206, 50.920340];
let map;
const mapRef = ref<VNodeRef | null>(null);


let agencies:Record<string,any>[];
const isEverythingOk = ref<boolean>(true);
async function initMap(mapCenter : LngLat, zoom: number) {

  await loadScript("https://api-maps.yandex.ru/v3/?apikey="+import.meta.env.VITE_MAPS_API_KEY+"&lang=ru_RU")

    .catch((error: Error) => {
      console.error("Ошибка при подключении к API. Проверьте ключ и убедитесь, что установлены HTTPReferer-ы в ЛК https://developer.tech.yandex.ru/")
    });

  await ymaps3.ready;
  await getCoordinates().then((res)=>{
    agencies = res.data;
  }).catch((err:AxiosError) => {
    console.error(err.message);
    isEverythingOk.value = false;
  });

  const LOCATION: YMapLocationRequest = {
    center: mapCenter,
    zoom: zoom,
  };
  const { YMap, YMapDefaultSchemeLayer } = ymaps3;
  map = new YMap(document.getElementById('map') as HTMLElement, { location: LOCATION });
  map.addChild(new YMapDefaultSchemeLayer({}));
  map.addChild(new ymaps3.YMapDefaultFeaturesLayer({zIndex: 1800}));
  for(let obj of agencies) {
    const element = obj as { city_name: string, coords: LngLat };

    // Создание маркера
    const markerElement = document.createElement('div');
    const markerInnerElement = document.createElement('div');
    const markerToolTip = document.createElement('div');

    markerInnerElement.className = 'map-agency-marker';
    markerToolTip.className = 'map-agency-tooltip'
    markerToolTip.textContent = element.city_name;

    markerElement.className = 'map-agency-marker-container';
    markerElement.appendChild(markerInnerElement);
    markerElement.appendChild(markerToolTip);


    const marker = new ymaps3.YMapMarker({
      coordinates: element.coords.reverse() as LngLat,
      onClick: () => {},
    }, markerElement);
    //console.log(element.coords);
    map.addChild(marker);
  }

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
:global(.map-agency-marker-container){
  position: absolute;
  z-index: 99;
  top: -50px;
  right: -16px;
  width: 27px;
  height: 33px;
  background: url("@/assets/icons/geoPin.svg");
}
:global(.map-agency-marker-container > .map-agency-tooltip){
  display: none;
}
:global(.map-agency-marker-container:hover > .map-agency-tooltip){
  font: var(--font-family);
  color: var(--blue);
  font-weight: 900;
  display: unset;
  margin-left: 35px;
  width: 100px;
  z-index: 99;
}

#map{
  width: 100%;
  height: 400px;
}
.cities-wrapper {
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