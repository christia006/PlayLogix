<template>
  <article
    class="rounded-xl border absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 sm:w-[50vw] sm:h-[50vh] w-[75vw] h-[60vh]"
  >
    <GameImageCloseButton @close-event="emits('close-modal-event')" />
    <SliderButton class="-left-11 sm:-left-16" @click="emits('prev-event')">
      <template #icon>
        <BaseIcon size="big">
          <LeftIcon />
        </BaseIcon>
      </template>
    </SliderButton>
    <fieldset class="w-full h-full relative overflow-x-hidden rounded-xl">
      <img
        v-for="(photo, index) in allPhotos"
        :src="photo"
        :alt="photo"
        class="rounded-xl h-full w-full absolute top-0 left-0 transition-all object-cover duration-500"
        :style="{ transform: translateElement(index, selectedImageIndex) }"
      />
    </fieldset>
    <SliderButton class="-right-11 sm:-right-16" @click="emits('next-event')">
      <template #icon>
        <BaseIcon size="big">
          <RightIcon />
        </BaseIcon>
      </template>
    </SliderButton>
  </article>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { translateElement } from "src/utils/helpers";
import GameImageCloseButton from "src/components/ui/game/GameImageCloseButton.vue";
import BaseIcon from "src/icons/BaseIcon.vue";
import LeftIcon from "src/icons/LeftIcon.vue";
import RightIcon from "src/icons/RightIcon.vue";
import SliderButton from "src/components/ui/buttons/SliderButton.vue";

defineProps({
  selectedImageIndex: {
    type: Number,
    required: true,
  },
  allPhotos: {
    type: Array as PropType<string[]>,
    required: true,
  },
});

const emits = defineEmits(["close-modal-event", "next-event", "prev-event"]);
</script>
