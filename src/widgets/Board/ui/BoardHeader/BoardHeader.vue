<template>
  <header class="w-full flex justify-between flex-wrap">
    <h1 class="text-h-small font-bold">Карточки</h1>

    <nav class="flex justify-end flex-1 items-center gap-[0.8rem] flex-wrap">
      <ProjectsSelect
        class="!flex-row !gap-[0.4rem] !items-center max-w-[20rem]"
        v-model="store.currentProject"
        :has-shutdown="true"
      />

      <BaseButton class="filled small" :link="{ to: '/create' }">
        Добавить карточку
      </BaseButton>

      <BaseButton class="filled small"> Сохранить изменения </BaseButton>
    </nav>
  </header>
</template>

<script setup lang="ts">
import ProjectsSelect from "@/features/ProjectsSelect/ProjectsSelect.vue";
import BaseButton from "@/shared/ui/Button/BaseButton.vue";

import { useBoardStore } from "../../model/useBoardStore";

const store = useBoardStore();
</script>

<style scoped lang="scss"></style>
