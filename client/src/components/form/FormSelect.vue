<template>
  <select
    class="w-full px-3 py-2 rounded-xl bg-slate-50 text-slate-950 outline-none"
    :id="id"
    :value="modelValue"
    @change="(e) => emits('update:modelValue', (e.target as HTMLSelectElement).value)"
  >
    <option v-for="option in options">{{ option }}</option>
  </select>
</template>

<script setup lang="ts">
import { PropType } from "vue";

defineProps({
  options: {
    type: Array as PropType<string[]>,
    required: true,
  },
  modelValue: {
    type: String,
    required: false,
  },
  id: {
    type: String,
    required:true
  }
});

const emits = defineEmits(["update:modelValue"]);
</script>
