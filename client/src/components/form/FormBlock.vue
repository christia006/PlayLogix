<template>
  <fieldset
    :class="['relative border-none flex sm:gap-2 items-center justify-between', positionOptions[position]]"
  >
    <slot name="label" />
    <slot name="input" />
    <slot name="line" />
    <span v-if="$slots.error" class="absolute -bottom-[30%] left-0">
      <slot name="error" />
    </span>
  </fieldset>
</template>

<script setup lang="ts">
import { PropType } from "vue";

const positionOptions = {
  column: "flex-col",
  row: "flex-row",
};

type PositionType = keyof typeof positionOptions;

defineProps({
  position: {
    type: String as PropType<PositionType>,
    default: "column",
  },
});
</script>
