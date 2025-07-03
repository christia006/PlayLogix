<template>
  <figure class="border border-purple">
    <img
      class="w-[30px]"
      v-for="image in consoles"
      :src="image.console.image"
      :alt="image.console.image"
    />
  </figure>
</template>

<script setup lang="ts">
type ConsoleType = {
  console: {
    image: string;
  };
};

import { PropType } from "vue";

defineProps({
  consoles: {
    type: Array as PropType<ConsoleType[]>,
    required: true,
  },
});
</script>

<style scoped></style>
