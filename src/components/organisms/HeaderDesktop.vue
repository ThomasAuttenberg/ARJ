<script setup lang="ts">
import { RouterLink } from 'vue-router'
import TizaLogo from '@/components/atoms/TizaLogo.vue'
import { type Component, computed, nextTick, type PropType, ref, type VNodeRef } from 'vue'
import type {IProvidedComponent} from '@/hooks/types'

interface IRoutesProp{
  route: string,
  anchor?: string
  title: string,
}

const emits = defineEmits(["logoClick"])

const props = defineProps({
  routes: {type: Array as PropType<IRoutesProp[]>},
  activeRouteId: {type: Number},
  leftSideComponents: {type: Array as PropType<IProvidedComponent[]>},
  rightSideComponents: {type: Array as PropType<IProvidedComponent[]>},
  logo: {type: Object as PropType<IProvidedComponent>},
  rightSideSeparatedComponent: {type: Object as PropType<IProvidedComponent>},
});

const menuRef = ref<VNodeRef | null>(null);
const menuState = ref(false);
const wrapper = ref<VNodeRef | null>(null);

function menuStateChanger(val : Event){
  menuState.value = (val.target as HTMLInputElement).checked;
  if(menuState.value){
    document.body.classList.add('body-no-scroll');
  }else{
    document.body.classList.remove('body-no-scroll');
  }
}

window.addEventListener('resize', ()=>{
  if(window.matchMedia("(min-width: 1181px)").matches){
    document.body.classList.remove('body-no-scroll');
  }
});

function onRouterLinkClick(val:number){
  setTimeout(()=> {
    const routes = props.routes as IRoutesProp[];
    if (routes[val].anchor) {
      let element = document.getElementById(routes[val].anchor as string);
      let top = element?.offsetTop;
      if (top)
        window.scrollTo(0, top - (wrapper.value as HTMLElement).getBoundingClientRect().height);
      if(menuState.value){
        menuState.value = false;
        (menuRef.value as HTMLInputElement).checked = false;
      }
    }
  });
}
</script>

<template>
  <div ref="wrapper" class = "header-useless-wrapper" >
  <div class = "height-filler"/>
  <div class="header-header-container">
    <div class ="header-header-block">
    <div class="header-header-desktop">
      <div class = "header-tablet-links tablet">
        <div class="header-tablet-links-block">
          <component v-for="(comp,index) in props.leftSideComponents" :key="index" :is="comp.component" v-bind="comp.props" v-on="comp.eventListeners ? comp.eventListeners : {}"/>
        </div>
        <div class="header-tablet-links-block">
          <component v-for="(comp,index) in props.rightSideComponents" :key="index" :is="comp.component" v-bind="comp.props" v-on="comp.eventListeners ? comp.eventListeners : {}"/>
        </div>
      </div>
        <div class = "header-separator tablet"/>
    <div class="header-content-container">
      <div class="header-logo-block">
        <component class="header-logo-logo" @click="emits('logoClick')" :is="logo?.component" v-on="logo?.eventListeners ? logo.eventListeners : {}"/>
        <component class="desktop" v-for="(comp,index) in props.leftSideComponents" :key="index" :is="comp.component" v-bind="comp.props" v-on="comp.eventListeners ? comp.eventListeners : {}"/>
      </div>
      <div class="header-content-block">
        <div class = "header-links desktop">
          <component v-for="(comp,index) in props.rightSideComponents" :key="index" :is="comp.component" v-bind="comp.props" v-on="comp.eventListeners ? comp.eventListeners : {}"/>
        </div>
        <div v-if=rightSideSeparatedComponent class="header-order-button not-mobile">
          <component
            :is="rightSideSeparatedComponent.component"
            v-bind="rightSideSeparatedComponent.props"
            v-on="rightSideSeparatedComponent?.eventListeners ? rightSideSeparatedComponent.eventListeners : {}"/>
        </div>
        <div class="not-desktop">
        <input ref="menuRef" type="checkbox" @change="menuStateChanger" id="burger-checkbox" class="burger-checkbox">
        <label class="burger" for="burger-checkbox">
          <span class="middle"></span>
        </label>
        </div>
      </div>
    </div>
    <div class ="header-separator desktop"/>
    <div class="header-router-links desktop">
      <RouterLink @click="onRouterLinkClick(key)" v-for="(route,key) in props.routes" :key :to="route.route" :class="{active:key==props.activeRouteId}" >{{route.title}}</RouterLink>
    </div>
      <div class="not-desktop"/>
    </div>
    </div>
    <div class = "header-menu not-desktop" :class="{active:menuState}">
      <div class = "header-menu-routes header-router-links">
        <RouterLink @click="onRouterLinkClick(key)" v-for="(route,key) in props.routes" :key :to="route.route" :class="{active:key==props.activeRouteId}" >{{route.title}}</RouterLink>
      </div>
      <div class = "header-menu-links mobile">
        <div v-if=rightSideSeparatedComponent class="header-menu-separated-component">
          <component
            :is="rightSideSeparatedComponent.component"
            v-bind="rightSideSeparatedComponent.props"
            v-on="rightSideSeparatedComponent?.eventListeners ? rightSideSeparatedComponent.eventListeners : {}"/>
        </div>
        <component v-for="(comp,index) in props.leftSideComponents" :key="index" :is="comp.component" v-bind="comp.props" v-on="comp.eventListeners ? comp.eventListeners : {}"/>
        <component v-for="(comp,index) in props.rightSideComponents" :key="index" :is="comp.component" v-bind="comp.props" v-on="comp.eventListeners ? comp.eventListeners : {}"/>
      </div>
    </div>
  </div>
  </div>
</template>

<style scoped>

.header-menu-separated-component{
  padding-bottom: 40px;
}
.header-menu-routes{
  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap:20px;
}

.header-menu-links{
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap:10px;
}

.header-header-block{
  width: 100%;
  display: flex;
  justify-content: center;
  background: white;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.03);
  z-index: 2;
}
.header-menu{
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  right: -100%;
  width: 100%;
  height: calc(100 * var(--vh, 1vh) - 100%);
  background: #FFFFFF;
  transition: right 0.2s;
}
.header-menu.active{
  right: 0;
  transition: right 0.3s;
}

.header-tablet-links-block{
  display: flex;
  gap: 20px;
}

.header-logo-logo{
  cursor: pointer;
}
.header-router-links{
  height: 20px;
  align-items: center;
  display: flex;
}
.header-router-links.desktop {
  justify-content: space-between;
}
.header-separator {
  background: #e0e0e0;
  width: 100%;
  height: 1px;
}
.header-links{
  display: flex;
  gap: 20px;
}
.header-content-block{
  display: flex;
  align-items: center;
  gap: 30px;
}
.header-logo-block{
  display: flex;
  gap: 30px;
  align-items: center;
}
.header-content-container, .header-tablet-links{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  width: 100%;
}
.header-header-desktop{
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px 20px 20px 20px;
  top: 0;
  width: 1180px;
}

@media (768px <= width < 1181px) {
  .desktop{
    display: none;
  }
  .header-header-desktop{
    gap:10px;
    padding: 10px 20px 0 20px;
  }
  .header-content-block{
    gap: 20px;
  }
  .mobile{
    display: none;
  }
  .height-filler{
    height: 113px;
  }
}
@media (min-width: 1181px){
  .tablet{
    display: none;
  }
  .mobile{
    display: none;
  }
  .not-desktop{
    display: none;
  }
  .header-menu.active{
    display: none;
  }
  .height-filler{
    height: 132px;
  }
}
@media (width < 768px) {
  .desktop{
    display: none;
  }
  .tablet{
    display: none;
  }
  .not-mobile{
    display: none;
  }
  .header-header-desktop{
    gap:10px;
    padding: 10px 20px 0 20px;
  }
  .height-filler{
    height: 50px;
  }
  .header-logo-logo{
    width: 106px;
    height: 30px;
  }

}

.header-header-container{
  position: fixed;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  width: 100%;
}

.burger-checkbox {
  position: absolute;
  visibility: hidden;
}

.burger {
  cursor: pointer;
  display: block;
  position: relative;
  border: none;
  background: transparent;
  width: 24px; /* Уменьшенная ширина */
  height: 14px; /* Уменьшенная высота */
}

.burger::before,
.burger::after,
.burger .middle {
  content: '';
  left: 0;
  position: absolute;
  display: block;
  height: 2px; /* Уменьшенная высота линий */
  border-radius: 150px;
  background: #3F4657;
  transition: transform .3s, top .3s, bottom .3s;
}

.burger::before {
  width: 100%; /* Верхняя линия на всю ширину */
  top: 0;
}

.burger::after {
  width: 100%; /* Нижняя линия на всю ширину */
  bottom: 0;
}

.burger .middle {
  width: calc(100% - 8px); /* Ширина центральной полосы меньше */
  top: 50%; /* Центрирование по вертикали */
  left: 8px; /* Центрирование по горизонтали */
  transform: translateY(-1px); /* Корректировка позиционирования по центру */
}

.burger-checkbox:checked + .burger::before {
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

.burger-checkbox:checked + .burger::after {
  bottom: 50%;
  transform: translateY(50%) rotate(-45deg);
}

.burger-checkbox:checked + .burger .middle {
  transform: scale(0); /* Скрываем среднюю линию при активации */
}

</style>