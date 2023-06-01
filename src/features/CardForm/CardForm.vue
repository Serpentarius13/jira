<template>
  <form class="flex flex-col w-full h-full justify-between">
    <div class="flex flex-col gap-[2rem]">
      <InputLabel label="Заголовок *:">
        <TextInput placeholder="Заголовок" v-model="formValues['title']" />
      </InputLabel>

      <!-- select -->

      <InputLabel label="Проект:">
        <TheValuedSelect
          :options="valuedProjects"
          placeholder="Выберите проект"
          v-model="project"
        />
      </InputLabel>

      <InputLabel label="Стадия *:" v-if="stages && !isFromModal">
        <TheValuedSelect
          :options="valuedStages"
          placeholder="Выберите стадию"
          v-model="stage"
        />
      </InputLabel>

      <InputLabel label="Балл *:">
        <TextInput placeholder="Балл" v-model="formValues['score']" />
      </InputLabel>
    </div>

    <div class="flex gap-[0.4rem] mx-auto items-center">
      <BaseButton type="submit" />

      <BaseButton :link="{ to: '..' }" class="outline" v-if="!isFromModal"
        >Назад</BaseButton
      >
    </div>
  </form>
</template>

<script setup lang="ts">
import { ICard, IStage } from "@/shared/types/cards.types";
import { IValuedSelect } from "@/shared/types/shared.types";
import BaseButton from "@/shared/ui/Button/BaseButton.vue";

import InputLabel from "@/shared/ui/Input/Label/InputLabel.vue";

import TheValuedSelect from "@/shared/ui/Input/Select/TheValuedSelect.vue";
import TextInput from "@/shared/ui/Input/TextInput/TextInput.vue";
import { useBoardStore } from "@/widgets/Board/model/useBoardStore";
import { computed } from "@vue/reactivity";
import { reactive, ref } from "vue";

type TCardOmitted = Pick<ICard, "title" | "project" | "score" | "stage">;

const project = ref<string>("");
const stage = ref<string>("");

const store = useBoardStore();

const valuedProjects = computed<IValuedSelect["options"]>(() =>
  store.data.projects.map((p) => ({ value: p.code, name: p.name }))
);

const valuedStages = computed<IValuedSelect["options"]>(() =>
  store.data.stages.map((s) => ({ value: s.code, name: s.name }))
);

interface ICardForm {
  isFromModal?: boolean;
  defaultValues?: TCardOmitted;

  stages?: IStage[];
}
const { defaultValues, isFromModal } = defineProps<ICardForm>();

const formValues = reactive(
  defaultValues ?? { title: "", project: "", score: 0, stage: "" }
);
</script>

<style scoped lang="scss"></style>
