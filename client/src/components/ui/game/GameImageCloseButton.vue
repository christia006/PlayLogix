<template>
    <button
    class="absolute -top-11 right-0 border bg-slate-200 hover:bg-slate-300  dark:bg-transparent hover:scale-105 dark:border-transparent flex items-center gap-2 px-3 py-1 rounded-xl cursor-pointer transition-all duration-300 dark:hover:border-slate-50 hover:border dark:hover:bg-slate-950"
    @click="emits('close-event')"
  >
    <p>Close</p>
    <BaseIcon>
      <XIcon />
    </BaseIcon>
  </button>
</template>

<script setup lang="ts">
import BaseIcon from "src/icons/BaseIcon.vue";
import XIcon from "src/icons/XIcon.vue";


const emits = defineEmits(['close-event'])

</script>
