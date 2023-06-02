<template>
  <main class="w-[38rem] max-w-screen mx-auto mt-[17rem]">
    <h1 class="text-h-small font-bold pb-[2rem] text-center">
      Добавление карточки
    </h1>

    <CreateCardWidget />
  </main>
</template>

<script setup lang="ts">
import CreateCardWidget from "@/widgets/CreateCardWidget/CreateCardWidget.vue";
</script>

<style scoped lang="scss"></style>
