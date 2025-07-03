<template>
  <div class="absolute -top-10 right-1/2 translate-x-1/2 w-[75px] h-[75px]">
    <v-icon
      class="transform absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 transition-all duration-300"
      name="bi-star-fill"
      :scale="scale(5, 0.2)"
    />
    <h1
      class="text-sky-500 dark:text-red-500 text-3xl absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 transition-all duration-300"
      :style="{ scale: scale(1, 0.02) }"
    >
      {{ rating ?? "?" }}
    </h1>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  rating: {
    type: [Number, null],
    required: true,
  },
});

const scale = (scale: number, increment: number) => {
  if (props.rating) {
    scale += props.rating * increment;
  }
  return scale;
};
</script>
