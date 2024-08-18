<script setup lang="ts">

import TizaLogo from '@/components/atoms/TizaLogo.vue'
import PrettyButton from '@/components/atoms/PrettyButton.vue'
import LinkWithIcon from '@/components/molecules/LinkWithIcon.vue'
import GeoIco from '@/components/atoms/icons/GeoIco.vue'
import MailIco from '@/components/atoms/icons/MailIco.vue'
</script>

<template>
  <div class = pretty-footer-wrapper>
    <div class = "pretty-footer-upper-block">
      <div class="pretty-footer-logo">
        <TizaLogo class="pretty-footer-logo"/>
      </div>
      <div class="pretty-footer-upper-content-block">
        <div class = "pretty-footer-phone">
          <div class = "pretty-footer-phone-phone">
            +7 (777) 722 17 04
          </div>
          <div class = "pretty-footer-phone-caption">
            По россии и казахстану
          </div>
        </div>
        <div class = "pretty-footer-button">
          <PrettyButton text="Заказать грузоперевозку"/>
        </div>
      </div>
    </div>
    <div class = "divider-block">
    <div class = "divider"/>
    </div>
    <div class = "pretty-footer-lower-block">
      <div class = "pretty-footer-links-one">
        <LinkWithIcon text="г. Алматы, ст. Алматы-2" :ico="GeoIco"/>
        <LinkWithIcon text="sale@avtorailjet.kz" :ico="MailIco"/>
      </div>
      <div class = "pretty-footer-links-two">
        <a>Политика</a>
        <a>Оферта</a>
        <p>(C) ООО "Тиза Логистик", 2024</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pretty-footer-wrapper{
  font-family: var(--font-family);
  color: white;
  background: #5a5a5a;
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.pretty-footer-phone-phone{
  font-weight: 600;
  font-size: 20px;
  line-height: 130%;
}
.pretty-footer-phone-caption{
  font-size: 14px;
  line-height: 140%;
  text-align: right;
}
.divider-block{
  padding: 20px 0;
}
.divider{
  height: 1px;
  background: #909090;
}
.pretty-footer-lower-block{
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.pretty-footer-links-one{
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 15px;
  line-height: 140%;
}
.pretty-footer-links-two{
  font-size: 14px;
  display: flex;
  flex-direction: row;
  gap: 20px;
}
.pretty-footer-upper-block{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.pretty-footer-upper-content-block{
  display: flex;
  flex-direction: row;
  gap: 30px;
}
.pretty-footer-button{
  display: none;
  height: 51px;
  width: 242px;
}
.pretty-footer-logo{
  width: 106px;
  height: 30px;
}
.pretty-footer-links-one:deep(svg){
  fill:white;
}
@media (width >= 768px) {
  .pretty-footer-logo{
    width: 130px;
    height: 37px;
  }
  .pretty-footer-lower-block{
    flex-direction: row;
    justify-content: space-between;
  }
  .pretty-footer-links-one{
    flex-direction: row;
    gap: 15px;
  }
  .pretty-footer-links-two{
    gap: 15px;
  }
  .pretty-footer-button{
    display: block;
  }
}
@media (width >= 1181px) {
  .pretty-footer-links-two {
    gap: 20px;
  }
  .pretty-footer-links-one{
    gap: 30px;
  }
}
</style>