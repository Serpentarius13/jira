<template>
  <input
    class="py-[0.8rem] px-[1.6rem] rounded-smallest bg-lighest-gray text-gray text-smaller"
    v-model="model"
  />
</template>

<script setup lang="ts">
const model = defineModel<string>({ required: true });
</script>

<style scoped lang="scss"></style>
