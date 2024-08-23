
<template>
  <a :href="link" :class="{link:'clickable'}">
    <img class="byte_transit_logo" src="@/assets/images/byte-transit-logo.svg" alt="">
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