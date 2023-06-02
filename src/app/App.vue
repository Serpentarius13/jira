<template>
  <RouterView />
  <TheModal />
</template>

<script setup lang="ts">
import TheModal from "@/shared/ui/Modal/TheModal.vue";
import { useBoardStore } from "@/widgets/Board/model/useBoardStore";
import { onMounted } from "vue";

const store = useBoardStore();

onMounted(() => {
  store.initializeStore();
});
</script>

<style scoped lang="scss"></style>
