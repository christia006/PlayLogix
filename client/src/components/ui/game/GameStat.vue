<template>
  <div class="flex gap-2 items-center">
    <BaseIcon size="medium">
      <slot name="icon" />
    </BaseIcon>

    <div class="flex items-center gap-2 w-full">
      <h4 class="font-semibold ">
        <slot name="value" />
      </h4>
      <span>
        <slot name="name" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from "src/icons/BaseIcon.vue";
</script>
