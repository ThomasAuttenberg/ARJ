<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import TizaLogo from '@/components/atoms/TizaLogo.vue'
import LinkWithIcon from '@/components/molecules/LinkWithIcon.vue'
import GeoIco from '@/components/atoms/icons/GeoIco.vue'
import PhoneIco from '@/components/atoms/icons/PhoneIco.vue'
import MailIco from '@/components/atoms/icons/MailIco.vue'
import HeaderDesktop from '@/components/organisms/FlexibleHeader.vue'
import { ref, type VNodeRef, watch } from 'vue'
import router from '@/router'
import PrettyFooter from '@/components/organisms/PrettyFooter.vue'
import ModalFieldsWindow from '@/components/organisms/ModalFieldsWindow.vue'
import type { ModalWindowPropsType } from '@/hooks/types'
import PrettyButtonFlexible from '@/components/atoms/PrettyButtonFlexible.vue'
import ModalNotification from '@/components/atoms/ModalNotification.vue'
import scrollToCalculations from '@/hooks/ScrollToCalculations'
import ButtonAndLogo from '@/components/molecules/OnceUseCombination/ButtonAndLogo.vue'
import ByteTransitLogoDefault from '@/components/atoms/icons/ByteTransitLogoDefault.vue'

const activeRouteId = ref(0);
const isModalFieldsShowing = ref(false);
const route = useRoute();
const headerRef = ref<VNodeRef | null>(null);

function onHeaderButtonClicked(){
  (headerRef.value as typeof HeaderDesktop).hideMenu();
  scrollToCalculations();
}
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
  modalWindowProps.name = arg?.name;
  modalWindowProps.phone = arg?.phone;
  modalWindowProps.email = arg?.email;
  modalWindowProps.success = arg?.success;
  isModalFieldsShowing.value=true;
}

const modalFieldsWindowResult = ref<Record<string, any>>({});
const isWarning = ref(false);
const notificationWindow = ref<VNodeRef | null>(null);

const sendWarningNotification = (text:string, delay?:number)=>{
  isWarning.value = true;
  const delay_ = delay || 2000;
  notificationWindow.value.sendNotification(text,delay_);
}

const sendSuccessNotification = (text:string, delay?:number)=>{
  isWarning.value = false;
  const delay_ = delay || 2000;
  notificationWindow.value.sendNotification(text,delay_);
}

function onModalFieldsWindowSubmit(val:Record<string, any>){
  modalFieldsWindowResult.value = val;
  isModalFieldsShowing.value=false;
}


</script>

<template>
  <header>
    <HeaderDesktop id="header-desktop" ref="headerRef"
      :routes="[
        {title: 'Главная', route:'/', anchor:'main'},
        {title: 'Направления и тарифы', route:'/', anchor: 'directions'},
        {title: 'Часто задаваемые вопросы', route:'/', anchor: 'faq'},
        {title: 'Адреса терминалов партнера', route:'/', anchor:'agencies'},
      ]"
      :active-route-id = "activeRouteId"
      :left-side-components="[
        {component: LinkWithIcon, props: {ico: GeoIco, text: 'ул. Аргымак, 1 (бывш. Промышленная,1)',}}
      ]"
      :right-side-components="[
        {component: LinkWithIcon, props: {ico: PhoneIco, text: '+7 7777 155 100', link:'tel:+7 7777 155 100'}},
        {component: LinkWithIcon, props: {ico: MailIco, text: 'sale@avtorailjet.kz',link:'mailto:sale@avtorailjet.kz'}},
      ]"
      :partnerLogo="{component: ByteTransitLogoDefault, props:{link:'https://www.sibtrans.ru/route-kazakhstan/'}}"
      :logo = "{component: TizaLogo}"
      :right-side-separated-component="{component: PrettyButtonFlexible, props:{text: 'Заказать грузоперевозку'}, eventListeners: {click:onHeaderButtonClicked}}"
      @logo-click = "router.push('/'); scrollToTop();"
    />
  </header>
  <div class="notification-wrapper">
    <ModalNotification class="modal-fields-notification" :class="{warning:isWarning, success: !isWarning}" ref="notificationWindow"/>
  </div>
  <ModalFieldsWindow
    v-if="isModalFieldsShowing"
    :modalWindowProps="modalWindowProps"
    @escape="isModalFieldsShowing=false"
    @submit="onModalFieldsWindowSubmit"
    @successNotificationRequest="sendSuccessNotification"
    @warningNotificationRequest="sendWarningNotification"
  />
  <div class="app-component-wrapper">
  <RouterView id="app_component"
              @watchingElement="onWatchingElementChange"
              :modalWindowShowing="isModalFieldsShowing"
              :modalWindowProps ="modalWindowProps"
              @exitModalWindow="isModalFieldsShowing=false"
              @successNotificationRequest="sendSuccessNotification"
              @warningNotificationRequest="sendWarningNotification"
              @callModalWindow="callOrderModalWindow"/>
  </div>
  <footer>
    <PrettyFooter @callModalWindow="callOrderModalWindow"/>
  </footer>
</template>

<style scoped>
.app-component-wrapper{
  min-height: calc(100vh - 301px - 50px);
}
.notification-wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-fields-notification.warning{
  background: #EE182C;
}
.modal-fields-notification.success{
  background: var(--yellow);
}
*{
  font-family: var(--font-family);
  color: var(--text-color);
}
@media (width >=768px){
  .app-component-wrapper{
    min-height: calc(100vh - 113px - 201px);
  }
}
@media(width >= 1181px){
  .app-component-wrapper{
    min-height: calc(100vh - 145px - 201px);
  }
}








/*
======================   HEADERS     ==========================



 */

/* ================== text decoration =================== */
  header{
    font-family: var(--font-family);
    font-weight: 400;
    font-size: 14px;
    color: var(--gray);
  }
  #header-desktop:deep(.header-router-links) > a{
    text-decoration: none;
    color: var(--gray);
  }
#header-desktop:deep(.header-router-links) > .active{
    color: #3F4657;
    font-weight: 700;
  }
#header-desktop:deep(a){
  color: var(--gray);
}
  /* ==================================================== */
#header-desktop:deep(.button_btn){
  height:51px;
}
</style>
