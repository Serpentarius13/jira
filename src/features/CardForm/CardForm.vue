<template>
  <form
    class="flex flex-col w-full h-full flex-1 justify-between"
    @submit.prevent
  >
    <div class="flex flex-col gap-[2rem]">
      <InputLabel label="Заголовок *:">
        <TextInput placeholder="Заголовок" v-model="formValues['title']" />
      </InputLabel>

      <!-- select -->

      <ProjectsSelect
        v-model="formValues['project']"
        :default-value="
          typeof defaultValues?.project === 'string'
            ? store.getProjectByCode(defaultValues.project)?.name
            : ''
        "
      />

      <InputLabel label="Стадия *:" v-if="valuedStages && !isFromModal">
        <TheValuedSelect
          :options="valuedStages"
          placeholder="Не выбрано"
          v-model="formValues['stage']"
        />
      </InputLabel>

      <InputLabel label="Балл *:">
        <TextInput
          placeholder="Балл"
          v-model="formValues['score']"
          class="max-w-[8rem]"
        />
      </InputLabel>
    </div>

    <div class="flex gap-[0.4rem] mx-auto items-center mt-auto group">
      <LoadingButton type="submit" :on-click="handleFormSubmit">
        Добавить
      </LoadingButton>
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

import LoadingButton from "@/shared/ui/LoadingButton/LoadingButton.vue";
import ProjectsSelect from "../ProjectsSelect/ProjectsSelect.vue";
import { useBoardStore } from "@/widgets/Board/model/useBoardStore";
import useModalStore from "@/shared/stores/useModalStore";
import { reactive, computed } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

interface ICardForm {
  isFromModal?: boolean;
  defaultValues?: ICard;
  stage?: IStage["code"];

  callback: (card: ICard, id?: ICard["id"]) => any;
}
const {
  defaultValues = { title: "", project: "", stage: "", score: "", id: NaN },
  isFromModal,
  stage,
  callback,
} = defineProps<ICardForm>();

const store = useBoardStore();
const modalStore = useModalStore();

const toast = useToast();
const router = useRouter();

const valuedStages = computed<IValuedSelect["options"]>(
  () => store.data.stages.map((s) => ({ value: s.code, name: s.name })) ?? []
);

type TSchema = {
  [key in keyof ICard]?: { validations: Function[]; error: string };
};

const schema: TSchema = {
  title: {
    validations: [(t: string) => t.length <= 70 && t.length > 0],
    error: "Поле заголовок не может иметь больше 70 символов",
  },
  score: {
    validations: [(s: string) => parseFloat(s) >= 0],
    error: "Поле балл должно быть натуральным числом",
  },
};

if (defaultValues?.stage || !isFromModal) {
  schema.stage = {
    validations: [(st: string) => st.length > 3],
    error: "Выберите стадию",
  };
}

const formValues = reactive<
  Pick<ICard, "project" | "title" | "stage"> & { score: number | string }
>(defaultValues);

const handleFormSubmit = async () => {
  const isValid = Object.keys(formValues)
    .map((k) => {
      //@ts-expect-error
      const currentSchema = schema[k] as TSchema[keyof TSchema];
      if (!currentSchema) return true;

      const errors = currentSchema.validations.map((v) => {
        //@ts-expect-error
        if (!v(formValues[k])) {
          toast.warning(currentSchema.error);
          return false;
        }

        return true;
      });

      return errors.every((e) => !!e);
    })
    .every((v) => !!v);

  if (!isValid) return;
  await callback(
    {
      ...formValues,
      stage: formValues.stage || defaultValues?.stage || stage,
    } as ICard,
    defaultValues?.id
  );

  if (isFromModal) {
    modalStore.closeModal();
  } else {
    router.push("/");
  }
};
</script>

<style scoped lang="scss"></style>
