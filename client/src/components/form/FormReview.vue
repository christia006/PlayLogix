<template>
  <form
    class="bg-slate-200 dark:bg-slate-900 relative h-full pt-16 pb-10 rounded-xl"
  >
    <BaseIcon
      class="absolute top-2 right-2 cursor-pointer"
      size="big"
      @click="emits('close-modal-event')"
    >
      <XIcon />
    </BaseIcon>
    <div class="flex flex-col gap-4 items-center px-8 sm:w-[500px] sm:px-20 mx-auto">
      <p v-if="!props.userId" class="text-sky-500 dark:text-red-500">
        RATE THIS
      </p>
      <h2 class="text-xl">{{ props.name }}</h2>
      <slot />
    </div>
  </form>
</template>

<script setup lang="ts">
import BaseIcon from "src/icons/BaseIcon.vue";
import XIcon from "src/icons/XIcon.vue";

const emits = defineEmits(["close-modal-event"]);

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: [Number],
    required: false,
  },
});
</script>
