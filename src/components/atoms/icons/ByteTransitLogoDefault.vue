
<template>
  <a :href="link" style="{link:'clickable'}">
  <img class="byte_transit_logo" src="@/assets/images/byte-transit-logo-default.svg" alt="">
  </a>
</template>

<style scoped>
.byte_transit_logo{
  width: 100%;
}
.clickable{
  cursor: pointer;
}
</style>
<script setup lang="ts">
  defineProps({
    link:String,
  })
</script>