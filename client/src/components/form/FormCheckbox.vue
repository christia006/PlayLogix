<template>
  <input
    type="checkbox"
    :id="id"
    :checked="modelValue"
    @change="(e) => emits('update:modelValue', (e.target as HTMLInputElement).checked)"
  />
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["update:modelValue"]);
</script>
