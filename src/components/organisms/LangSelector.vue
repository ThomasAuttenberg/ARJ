<script setup lang="ts">

import { computed, type PropType, ref } from 'vue'
import { LANG } from '@/hooks/Locale/Locale'
import RuFlag from '@/components/atoms/icons/LangSelector/RuFlag.vue'
import KzFlag from '@/components/atoms/icons/LangSelector/KzFlag.vue'
import USFlag from '@/components/atoms/icons/LangSelector/USFlag.vue'
import { useLangStore } from '@/stores/lang'
import CloseWIndowCross from '@/components/atoms/icons/CloseWIndowCross.vue'

type dsType = 'desktop' | 'mobile' | 'tablet';
const props = defineProps({
  groupName: {type: String, required: true},
  displayStyle: {type: String as PropType<dsType>}
})
const desktop = computed(()=>props.displayStyle === 'desktop');
const tablet = computed(()=>props.displayStyle === 'tablet');
const mobile = computed(()=>props.displayStyle === 'mobile');

const lang = computed(()=>{
  return {
    kz: useLangStore().locale == LANG.KZ,
    ru: useLangStore().locale == LANG.RU,
    en: useLangStore().locale == LANG.EN,
  }
})


const isMenuShowing = ref(false);
function onLabelClick(){
  if(!desktop.value)
    isMenuShowing.value = true;
}
function onListConainerClick(){
  if(isMenuShowing.value) {
    isMenuShowing.value = false;
  }
}
function onLangChange(val:LANG){
  useLangStore().setLang(val);
}

const strings = computed(()=> useLangStore().langStrings.LangSelector);

</script>

<template>
<div class = "lang-selector-container">
  <div class = "lang-selector-label" :class="{mobile:mobile}" @click="onLabelClick" >
    <div class="lang-selected-label" v-if="lang.ru">
      <RuFlag class="lang-selector-flag"/>
      <div v-if="!mobile" class="text">
        <span v-if="desktop">RU</span>
        <span v-if="tablet">Русский</span>
      </div>
    </div>
    <div class="lang-selected-label" v-if="lang.kz">
      <KzFlag class="lang-selector-flag"/>
      <div v-if="!mobile" class="text">
        <span v-if="desktop">KAZ</span>
        <span v-if="tablet">Қазақ</span>
        <!--Қазақ-->
      </div>
    </div>
    <div class="lang-selected-label" v-if="lang.en">
      <USFlag class="lang-selector-flag"/>
      <div v-if="!mobile" class="text">
        <span v-if="desktop">EN</span>
        <span v-if="tablet">English</span>
      </div>
    </div>
  </div>
  <div class="lang-selector-selector-hover-container" v-show="desktop ? true : isMenuShowing" :class="{desktop:desktop}" @click="onListConainerClick">
    <div class="lang-selector-selector" @click.stop>
      <CloseWIndowCross :class="{desktop:desktop}" class="lang-selector-exit" @click="onListConainerClick"/>
      <div class="lang-selector-title">
        {{ strings.title }}
      </div>
      <div class="lang-selector-list">
        <label class="lang-selector-list-item">
          <span class="item-flag-n-text">
            <RuFlag class="lang-selector-flag"/>Русский
          </span>
          <input class="lang-selector-input" type="radio" :name="`selector_${groupName}`" :checked="lang.ru" @click="onLangChange(LANG.RU)"/>
        </label>
        <label class="lang-selector-list-item" >
          <span class="item-flag-n-text">
            <KzFlag class="lang-selector-flag"/>Қазақ
          </span>
          <input class="lang-selector-input" type="radio" :name="`selector_${groupName}`" :checked="lang.kz" @click="onLangChange(LANG.KZ)" >
        </label>
        <label v-if="false" class="lang-selector-list-item">
          <span class="item-flag-n-text">
            <USFlag class="lang-selector-flag"/>English
          </span>
          <input class="lang-selector-input" type="radio" :name="`selector_${groupName}`" :checked="lang.en" @click="onLangChange(LANG.EN)"/>
        </label>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>

.lang-selector-exit{
  position: absolute;
  top: 10px;
  right: 10px;
}
.lang-selector-exit.desktop{
  display: none;
}
.lang-selector-input{
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  background: url("@/assets/icons/LangSelector/radioButtonDef.svg");
  background-size: cover;
}
.lang-selector-input:checked{
  background: url("@/assets/icons/LangSelector/radioButtonActive.svg");
  background-size: cover;
}
.lang-selector-selector-hover-container:not(.desktop) .lang-selector-input{
  width: 20px;
  height: 20px;
}


.lang-selector-container{
  position: relative;
}
.lang-selector-container:hover > .lang-selector-selector-hover-container{
  display:flex;
}
@keyframes changeColor {
  0%{
    background: rgba(0,0,0,0.1);
  }
  100%{
    background: rgba(0,0,0,0.7);
  }
}
.lang-selector-selector-hover-container{
  align-content: center;
  position: fixed;
  z-index: 99;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.7);
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  animation: changeColor 1s;
}
.lang-selector-selector-hover-container.desktop{
  align-content: normal;
  background: none;
  animation: none;
  display: none;
  position: absolute;
  padding: 20px;
  left: -20px;
  width: 240px;
  height: auto;
}

.lang-selector-selector-hover-container:not(.desktop) > .lang-selector-selector{
  animation: appearing 0.4s ease-out;
  border-radius: 20px;
  padding: 30px 20px 20px 20px;
  width: clamp(260px, 350px, calc(100vw - 40px));
}
.lang-selector-title{
  font-family: var(--font-family);
  font-weight: 600;
  font-size: 20px;
  line-height: 130%;
  text-align: center;
  color: #3f4657;
}
.lang-selector-selector-hover-container.desktop .lang-selector-title{
  display: none;
}
@keyframes appearing {
  0%{
    margin-top: -30vh;
  }
  80%{
    margin-top: 0;
  }
}
.lang-selector-selector{
  position: relative;
  overflow: auto;
  width: 200px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.05);
  align-self: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.lang-selected-label > .text{
  font-size: 14px;
}
.lang-selected-label{
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
}
.lang-selector-flag{
  width: 30px;
  height: 30px;
}
.lang-selector-selector-hover-container:not(.desktop) .lang-selector-flag{
  width: 40px;
  height: 40px;
}
.lang-selected-label > .lang-selector-flag{
  width: 20px;
  height: 20px;
}
.lang-selector-label.mobile .lang-selector-flag{
  width: 30px;
  height: 30px;
}
.item-flag-n-text{
  font-size: 15px;
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
}
.lang-selector-list-item{
  border-radius: 10px;
  padding: 10px;
  background: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.lang-selector-selector-hover-container:not(.desktop) .lang-selector-list-item{
  padding: 0;
}
</style>