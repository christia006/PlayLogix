<template>
  <label :for="id" class="relative w-full h-full rounded-xl">
    <slot />
  </label>
</template>

<script setup lang="ts">
defineProps({
  id: {
    type: String,
    required: true,
  },
});
</script>
