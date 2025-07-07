<template>
  <section
    class="sm:max-w-[300px] flex flex-col align-center gap-2 rounded-xl relative bg-slate-50 dark:bg-slate-700 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    @click="seeGameDetails(id)"
  >
    <img
      :src="thumbnail"
      loading="lazy"
      class="w-full sm:h-[300px] object-cover rounded-xl"
    />
    <div class="flex flex-col gap-4 p-4">
      <h1 class="text-justify text-lg sm:text-xl">{{ name }}</h1>

      <div class="grid grid-cols-2 gap-4">
        <GameStat>
          <template #icon>
            <ClockIcon />
          </template>
          <template #value>{{ gameplayHours }}</template>
          <template #name>hours</template>
        </GameStat>
        <GameStat>
          <template #icon>
            <StarIcon />
          </template>
          <template #value>{{ rating }}</template>
          <template #name>rating</template>
        </GameStat>
        <GameStat>
          <template #icon>
            <CalendarIcon />
          </template>
          <template #value>{{ releaseYear }}</template>
        </GameStat>
        <GameStat>
          <template #icon>
            <DollarIcon />
          </template>
          <template #value>{{ price }}</template>
          <template #name>price</template>
        </GameStat>
        <p>Available on:</p>
        <ConsoleWrapper>
          <ConsoleComponent
            v-for="obj in consoles"
            :key="obj.console.id"
            :image="obj.console.image"
          />
        </ConsoleWrapper>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { GameType } from "src/utils/types";
import { useRouter } from "vue-router";
import ClockIcon from "src/icons/ClockIcon.vue";
import StarIcon from "src/icons/StarIcon.vue";
import DollarIcon from "src/icons/DollarIcon.vue";
import CalendarIcon from "src/icons/CalendarIcon.vue";
import GameStat from "src/components/ui/game/GameStat.vue";
import ConsoleComponent from "src/components/ui/game/ConsoleComponent.vue";
import ConsoleWrapper from "src/components/ui/game/ConsoleWrapper.vue";

const props = defineProps({
  game: {
    type: Object as PropType<GameType>,
    required: true,
  },
});

const {
  name,
  releaseYear,
  price,
  gameplayHours,
  id,
  thumbnail,
  consoles,
  rating,
} = props.game;
const router = useRouter();

const seeGameDetails = (id: number) => {
  router.push({ name: "GameDetails", params: { id } });
};
</script>
