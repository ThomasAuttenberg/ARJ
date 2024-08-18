<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import TizaLogo from '@/components/atoms/TizaLogo.vue'
import LinkWithIcon from '@/components/molecules/LinkWithIcon.vue'
import GeoIco from '@/components/atoms/icons/GeoIco.vue'
import PhoneIco from '@/components/atoms/icons/PhoneIco.vue'
import MailIco from '@/components/atoms/icons/MailIco.vue'
import HeaderDesktop from '@/components/organisms/HeaderDesktop.vue'
import { ref, watch } from 'vue'
import router from '@/router'
import Button from '@/components/atoms/PrettyButton.vue'
import PrettyFooter from '@/components/organisms/PrettyFooter.vue'
import ModalFieldsWindow from '@/components/organisms/ModalFieldsWindow.vue'
import type { ModalWindowPropsType } from '@/hooks/types'

const activeRouteId = ref(0);
const isModalFieldsShowing = ref(false);
const route = useRoute();
function a(){console.log("clicked"); isModalFieldsShowing.value=true;}
function onWatchingElementChange(index:any){activeRouteId.value=index;}

function scrollToTop(){
  window.scrollTo(0,0);
}

watch(route, ()=>{
  if(route.name != 'main'){
    activeRouteId.value = -1;
  }
});

if(window.matchMedia("(max-width: 768px)").matches){
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  window.addEventListener('resize', updateViewportHeight);
}

function updateViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

const modalWindowProps : ModalWindowPropsType = {};
function callOrderModalWindow(arg: ModalWindowPropsType) {
  modalWindowProps.name = arg.name;
  modalWindowProps.phone = arg.phone;
  modalWindowProps.email = arg.email;
  isModalFieldsShowing.value=true;
}
</script>

<template>
  <header>
    <HeaderDesktop id="header-desktop"
      :routes="[
        {title: 'Главная', route:'/', anchor:'main'},
        {title: 'Направления и тарифы', route:'/', anchor: 'directions'},
        {title: 'Часто задаваемые вопросы', route:'/', anchor: 'faq'},
        {title: 'Адреса терминалов партнера', route:'/', anchor:'agencies'},
      ]"
      :active-route-id = "activeRouteId"
      :left-side-components="[
        {component: LinkWithIcon, props: {ico: GeoIco, text: 'г. Алматы, ст. Алматы-2'}}
      ]"
      :right-side-components="[
        {component: LinkWithIcon, props: {ico: PhoneIco, text: '+7 (777) 722 17 04'}},
        {component: LinkWithIcon, props: {ico: MailIco, text: 'acs.sv@mail.ru'}},
      ]"
      :logo = "{component: TizaLogo}"
      :right-side-separated-component="{component: Button, props:{text: 'Заказать грузоперевозку'}, eventListeners: {click:a}}"
      @logo-click = "router.push('/'); scrollToTop();"
    />
  </header>
  <RouterView id="app_component"
              @watchingElement="onWatchingElementChange"
              :modalWindowShowing="isModalFieldsShowing"
              :modalWindowProps ="modalWindowProps"
              @exitModalWindow="isModalFieldsShowing=false"
              @callModalWindow="callOrderModalWindow"/>
  <footer>
    <PrettyFooter/>
  </footer>
</template>

<style scoped>
*{
  font-family: var(--font-family);
  color: var(--text-color);
}








/*
======================   HEADERS     ==========================



 */

/* ================== text decoration =================== */
  header{
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 14px;
    color: #747474
  }
  #header-desktop:deep(.header-router-links) > a{
    text-decoration: none;
    color: #747474;
  }
#header-desktop:deep(.header-router-links) > .active{
    color: black;
    font-weight: 700;
  }
  /* ==================================================== */
#header-desktop:deep(.button_btn){
  width:241.4px;
  height:51px;
}
</style>
