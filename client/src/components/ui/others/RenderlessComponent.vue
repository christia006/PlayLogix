<template>
  <slot v-for="key in Object.keys(slots)" :key="key" :name="key" />
</template>

<script setup lang="ts">
const slots = defineSlots()
</script>