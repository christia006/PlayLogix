<template>
  <section class="flex items-center justify-between w-full mx-auto">
    <BaseIcon
      fill="black"
      stroke="black"
      viewBox="0 0 131 137"
      :style="{ width: `${size}rem`, height: `${size}rem` }"
    >
      <InspectorIcon />
    </BaseIcon>
    <h1 class="font-semibold text-3xl">No users found. Try again</h1>
    <BaseIcon
      fill="black"
      stroke="black"
      viewBox="0 0 131 137"
      :style="{ width: `${size}rem`, height: `${size}rem` }"
    >
      <InspectorIcon />
    </BaseIcon>
  </section>
</template>

<script setup lang="ts">
import BaseIcon from "src/icons/BaseIcon.vue";
import InspectorIcon from "src/icons/InspectorIcon.vue";

const size = 8.5;
</script>
