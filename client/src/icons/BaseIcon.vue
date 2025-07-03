<template>
  <svg
    :xmlns="xmlns"
    :fill="fill"
    :viewBox="viewBox"
    :stroke-width="strokeWidth"
    :stroke="stroke"
    :class="[`icon-${size}`]"
    :size="size"
  >
    <slot />
  </svg>
</template>

<script setup lang="ts">
defineProps({
  xmlns: {
    type: String,
    default: "http://www.w3.org/2000/svg",
  },
  fill: {
    type: String,
    default: "none",
  },
  viewBox: {
    type: String,
    default: "0 0 24 24",
  },
  strokeWidth: {
    type: String,
    default: "1.5",
  },
  stroke: {
    type: String,
    default: "currentColor",
  },
  size: {
    type: String,
    default: "medium",
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.icon-small {
  width: 0.5rem;
  height: 0.5rem;
}

.icon-medium {
  width: 1rem;
  height: 1rem;
}

.icon-big {
  width: 1.5rem;
  height: 1.5rem;
}

.icon-very-big {
  width: 2rem;
  height: 2rem;
}
</style>
