<template>
  <component :is="icon" />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

type TIconName =
  | "arrow-down"
  | "chevron-down"
  | "cross"
  | "dots"
  | "edit"
  | "trashcan";

interface IIcon {
  name: TIconName;
}

const { name } = defineProps<IIcon>();

const icon = defineAsyncComponent(
  () => import(`../../../../assets/icons/${name}.svg`)
);
</script>

<style scoped lang="scss"></style>
