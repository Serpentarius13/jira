<template></template>

<script setup lang="ts">
import { ICard } from "@/shared/types/cards.types";
import { reactive } from "vue";

type TCardOmitted = Pick<ICard, "title" | "project" | "score">;

interface ICardModal {
  card?: TCardOmitted;
}

const props = defineProps<ICardModal>();

const formData = reactive<TCardOmitted>(
  props.card ?? { title: "", project: "", score: 0 }
);
</script>

<style scoped lang="scss"></style>
