<template>
  <textarea
    class="border w-full min-h-24 rounded-xl p-2 mt-4"
    :maxlength="maxCharacters"
    :value="modelValue"
    :placeholder="placeholder"
    @input="(e) => emits('update:modelValue', (e.target as HTMLTextAreaElement)?.value)"
  >
  </textarea>
</template>

<script setup lang="ts">
defineProps({
  maxCharacters: {
    type: Number,
    default: 300,
  },
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Your thoughts...',
  },
});

const emits = defineEmits(["update:modelValue"]);
</script>
