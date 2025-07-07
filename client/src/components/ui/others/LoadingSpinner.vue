<template>
  <div
    :class="[
      'border-4 border-b-4 border-white border-b-sky-500 dark:border-b-red-500 rounded-full inline-block box-border animate-spin absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2',
      loadingSizeOptions[size],
    ]"
  ></div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";

type SizeType = keyof typeof loadingSizeOptions;

defineProps({
  size: {
    type: String as PropType<SizeType>,
    default: "big",
  },
});

const loadingSizeOptions = {
  small: "w-8 h-8",
  big: "w-12 h-12",
};
</script>
