<script setup lang="ts">

defineProps({
  text: String,
});

</script>

<template>
  <button class = "button_btn_btn">
    {{text}}
  </button>
</template>

<style scoped>
  .button_btn_btn {
    transition: 0.2s;
    font-family: var(--font-family);
    font-size: 15px;
    font-weight: 600;
    font-style: normal;
    color: white;
    cursor: pointer;
    border: none;
    padding: 15px 30px;
    background: #ffc300;
    border-radius: 10px;
    box-shadow: 0 15px 20px -10px rgba(241,157,0,0.4);
  }
  .button_btn_btn:hover{
    transition: 0.3s;
    box-shadow: 0 15px 30px -10px rgba(241,157,0,0.6);
    background: #ffae00;
  }
</style>