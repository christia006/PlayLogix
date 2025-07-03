<template>
  <div class="flex items-center gap-2">
    <BaseIcon>
      <StarIcon />
    </BaseIcon>
    <h3>
      Rated
      <span class="font-semibold"> {{ rating }} </span>/10
    </h3>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from "src/icons/BaseIcon.vue";
import StarIcon from "src/icons/StarIcon.vue";

defineProps({
  rating: {
    type: [Number, String],
    required: true,
  },
});
</script>
