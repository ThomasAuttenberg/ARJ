<script setup lang="ts">

import MainImage from '@/components/organisms/IntroductionImage.vue'
import Button from '@/components/atoms/Button.vue'
</script>

<template>
  <div class="mainImageContainer">
    <div class="mainImageContent">
      <div class="mainImageContent-title">
        Экспресс доставка из Казахстана в Россию
      </div>
      <div class = "mainImageContent-desc">
        Полный спектр транспортно-логистических услуг, включающих транспортировку,
        хранение и терминальную обработку грузов от двери Отправителя до двери Получателя
      </div>
      <div class="mainImageContent-button">
        <Button :text="'Заказать грузоперевозку'"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mainImageContent-button{
  display: flex;
  justify-content: center;
  margin: 30px auto;
}
.mainImageContent-desc{
  text-align: center;
  width: 650px;
  margin: 10px auto;
  line-height: 140%;
}
.mainImageContent-title{
  width: 100%;
  color: #3F4657;
  padding-top: 100px;
  text-transform: uppercase;
  text-align: center;
  font-weight: 800;
  font-size: 40px;
}
.mainImageContent{
  padding-left: 20px;
  padding-right: 20px;
  font-family: var(--font-family);
  font-size: 15px;
  margin: auto;
  width: 100%;
  height: 665px;
  background: url('@/assets/images/eurasianMap.svg') center center no-repeat;
  background-size: 1180px 665px;
}
.mainImageContainer{
  container-type: inline-size;
  width: 100%;
}
@media (768px <= width < 1181px){
  .mainImageContent-title{
    font-size: 32px;
    padding-top: 70px;
    width: 100%;
  }
  .mainImageContent{
    width: 100%;
    height: 650px;
    background-size: 768px 650px;
  }
}
@media (width < 768px) {
  .mainImageContent-title{
    font-size: 22px;
    padding-top: 50px;
  }
  .mainImageContent-desc{
    width: 100%;
  }
  .mainImageContent{
    width: 100%;
    height: 657px;
    background-size: 768px 650px;
  }
}
</style>