<template>
  <main
    class="mx-auto min-h-screen max-w-[1280px] flex flex-col gap-4 py-4 items-center"
  >
    <h1 class="text-2xl sm:text-5xl text-center py-4 sm:py-8">Your Reviews</h1>
    <ul
      class="flex flex-col sm:gap-4 gap-8 sm:px-0 px-2"
    >
      <li
        v-for="review in reviews"
        :key="review.id"
        class="flex items-center h-[250px] sm:gap-6 gap-2 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105"
        @click="seeGameDetails(review.gameId)"
      >
        <img
          :src="review.game.thumbnail"
          :alt="review.game.thumbnail"
          loading="lazy"
          class="h-full w-1/3 object-cover rounded-xl"
        />
        <div class="flex flex-col justify-between relative h-full w-2/3">
          <h2
            class="text-lg sm:text-3xl font-semibold italic dark:text-red-500 text-sky-500"
          >
            {{ review.game.name }}
          </h2>
          <p class="text-justify text-sm sm:text-base">{{ review.content }}</p>
          <div class="flex flex-col gap-1 sm:gap-2">
            <GameRating :rating="review.game.averageRating" />
            <h4>Your rating: {{ review.rating }}/10</h4>
          </div>
          <footer class="text-xs sm:text-sm">
            Reviewed on {{ formattedDate(review.createdAt) }}
          </footer>
        </div>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import { MyReviewType } from "src/utils/types";
import { PropType } from "vue";
import { formattedDate } from "src/utils/helpers";
import { useRouter } from "vue-router";
import GameRating from "src/components/ui/game/GameRating.vue";

defineProps({
  reviews: {
    type: Array as PropType<MyReviewType[]>,
    required: true,
  },
});

const router = useRouter();

const seeGameDetails = (id: number) => {
  router.push({ name: "GameDetails", params: { id } });
};
</script>
