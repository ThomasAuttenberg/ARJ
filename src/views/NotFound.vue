<script setup lang="ts">
</script>

<template>
  <div class="not-found-container">
    <div class="not-found-container-content">
      <div class="not-found-title">404. Данной страницы не существует :(</div>
      <div class="not-found-back-link">
        <RouterLink class="not-found-back-link-link" to="/">Вернуться на главную</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>

.not-found-container {
  display: flex;
  justify-content: center;
  width: 100%;  /* Занимаем 100% ширины */
  font-family: var(--font-family);
  color: var(--text-color);
}
.not-found-title {
  padding-top: 50px;
  font-size: 22px;
  text-align: center;
  font-weight: 600;
}
.not-found-back-link-link{
  cursor: pointer;
  color: var(--blue);
  text-decoration: none;
}
.not-found-container-content {
  padding: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
}
</style>
