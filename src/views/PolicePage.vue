<script setup lang="ts">

</script>

<template>
  <div class="wrapper-wrapper">
    <div class = "wrapper">
      <h1>Здесь могла бы быть политика организации</h1>
      <div class = "content-block">

      </div>
      <div class = "content-block">

      </div>
    </div>
  </div>
</template>

<style scoped>
  .wrapper-wrapper {
    display: flex;
    background: white;
    width: 100%;
    justify-content: center;
    min-height: calc(100vh - 226px - 50px);
  }
  .wrapper{
    flex:1fr;
    width: clamp(0px, 1180px, 1180px);
    padding: 100px 20px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    font-family: var(--font-family);
    color: var(--text-color);
  }
  h1{
    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;
  }
  h2{
    font-size: 15px;
    font-weight: 600;
  }
  p{
    padding-top: 20px;
    line-height: 140%;
    font-size: 14px
  }
  @media (width >=768px){
    .wrapper-wrapper{
      min-height: calc(100vh - 113px - 153px);
    }
    h1{
      font-size: 24px;
    }
  }
  @media(width >= 1181px) {
    .wrapper-wrapper {
      min-height: calc(100vh - 132px - 153px);
    }
    h1{
      font-size: 32px;
    }
  }
</style>