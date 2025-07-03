<template>
  <div
    class="z-10 w-full h-full fixed top-0 left-0"
    :style="{ backdropFilter: 'blur(3px)', backgroundColor: 'rgba(0,0,0,0.6)' }"
    @click="emits('close-modal-event')"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(["close-modal-event"]);
</script>
