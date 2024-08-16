<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import TizaLogo from '@/components/atoms/TizaLogo.vue'
import LinkWithIcon from '@/components/molecules/LinkWithIcon.vue'
import GeoIco from '@/components/atoms/icons/GeoIco.vue'
import PhoneIco from '@/components/atoms/icons/PhoneIco.vue'
import MailIco from '@/components/atoms/icons/MailIco.vue'
import HeaderDesktop from '@/components/organisms/HeaderDesktop.vue'
import { ref } from 'vue'
import router from '@/router'
import Button from '@/components/atoms/Button.vue'

const activeRouteId = ref(0);
function a(){console.log("clicked");}
</script>

<template>
  <header>
    <HeaderDesktop id="header-desktop"
      :routes="[
        {title: 'Главная', route:'/'},
        {title: 'Направления и тарифы', route:'/1'},
        {title: 'Часто задаваемые вопросы', route:'/2'},
        {title: 'Адреса терминалов партнера', route:'/3'},
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
      @logo-click = "router.push('/')"
    />
  </header>
  <RouterView id="app_component"/>
  <footer>

  </footer>
</template>

<style scoped>









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
#header-desktop:deep(.header-router-links) > .router-link-active{
    color: black;
    font-weight: 700;
  }
  /* ==================================================== */
#header-desktop:deep(.button_btn){
  width:241.4px;
  height:51px;
}
</style>
