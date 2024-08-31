<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import TizaLogo from '@/components/atoms/TizaLogo.vue'
import LinkWithIcon from '@/components/molecules/LinkWithIcon.vue'
import GeoIco from '@/components/atoms/icons/GeoIco.vue'
import PhoneIco from '@/components/atoms/icons/PhoneIco.vue'
import MailIco from '@/components/atoms/icons/MailIco.vue'
import HeaderDesktop from '@/components/organisms/FlexibleHeader.vue'
import { computed, onUpdated, ref, type VNodeRef, watch } from 'vue'
import router from '@/router'
import PrettyFooter from '@/components/organisms/PrettyFooter.vue'
import ModalFieldsWindow from '@/components/organisms/ModalFieldsWindow.vue'
import type { IRoutesProp, ModalWindowPropsType } from '@/hooks/types'
import PrettyButtonFlexible from '@/components/atoms/PrettyButtonFlexible.vue'
import ModalNotification from '@/components/atoms/ModalNotification.vue'
import scrollToCalculations from '@/hooks/UIActions/scrollToCalculations'
import ByteTransitLogoDefault from '@/components/atoms/icons/ByteTransitLogoDefault.vue'
import { useLangStore } from '@/stores/lang'

const activeRouteId = ref(0);
const isModalFieldsShowing = ref(false);
const route = useRoute();
const headerRef = ref<VNodeRef | null>(null);


function onHeaderButtonClicked(){
  headerRef.value.hideMenu();
  if(route.name != 'main'){
    const header = document.getElementById('header-desktop');
    scrollRequest = {
      anchor: 'calculation-block',
      indent: (header as HTMLElement).getBoundingClientRect().height
    }
    router.push('/');
  }else{
    scrollToCalculations();
  }
}


function scrollTo(id:string, indent:number){
  let element = document.getElementById(id as string);
  let top = element?.offsetTop;
  if (top)
    window.scrollTo({
      top: top - indent,
      behavior: 'smooth'
    });
}

let scrollRequest : {
  anchor: string,
  indent?: number,
} | null;

function onRouterLinkUsed(route:IRoutesProp, indent?:number) {
  if (route.route != router.currentRoute.value.path) {
    if (route.anchor) {
      scrollRequest = { anchor: route.anchor, indent };
    }
  }else{
    if(route.anchor)
      scrollTo(route.anchor,indent? indent : 0);
  }
}

onUpdated(()=>{
  if(scrollRequest != null){
    scrollTo(scrollRequest.anchor, scrollRequest.indent ? scrollRequest.indent : 0);
    scrollRequest = null;
  }
})


// Main view event handler: calls when there's changing watching element to set the correct route as active
function onWatchingElementChange(index:any){activeRouteId.value=index;}

function scrollToTop(){
  setTimeout(()=> window.scrollTo({
    top: 0,
    behavior: 'smooth'
  }));
}

watch(route, ()=>{
  if(route.name != 'main'){
    activeRouteId.value = -1;
  }
});

// Mobile browser adaptation: if any element needs to consider the url field
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

// Working with notifications
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

// Working with modal order window

const modalFieldsWindowResult = ref<Record<string, any>>({});
function onModalFieldsWindowSubmit(val:Record<string, any>){
  modalFieldsWindowResult.value = val;
  isModalFieldsShowing.value=false;
}

const strings = computed(()=> useLangStore().langStrings.FlexibleHeader);

</script>

<template>
  <header>
    <HeaderDesktop id="header-desktop" ref="headerRef"
      :routes="[
        {title: strings.routes[0], route:'/', anchor:'main'},
        {title: strings.routes[1], route:'/', anchor: 'directions'},
        {title: strings.routes[2], route:'/', anchor: 'faq'},
        {title: strings.routes[3], route:'/', anchor:'agencies'},
      ]"
      :active-route-id = "activeRouteId"
      :left-side-components="[
        {component: LinkWithIcon, props: {ico: GeoIco, text: strings.addressText,}}
      ]"
      :right-side-components="[
        {component: LinkWithIcon, props: {ico: PhoneIco, text: strings.phoneText, link:`tel:${strings.phoneText}`}},
        {component: LinkWithIcon, props: {ico: MailIco, text: strings.mailText,link:`mailto:${strings.mailText}`}},
      ]"
      :partnerLogo="{component: ByteTransitLogoDefault, props:{link:'https://www.sibtrans.ru/route-kazakhstan/'}}"
      :logo = "{component: TizaLogo}"
      :right-side-separated-component="{component: PrettyButtonFlexible, props:{text: strings.buttonText}, eventListeners: {click:onHeaderButtonClicked}}"
      @logo-click = "router.push('/'); scrollToTop();"
                   @on-router-link-used="onRouterLinkUsed"
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
  background: #7BC700;
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
#header-desktop:deep(.lang-selector){
  color: var(--gray);
}
  /* ==================================================== */
#header-desktop:deep(.button_btn){
  height:51px;
}
</style>
