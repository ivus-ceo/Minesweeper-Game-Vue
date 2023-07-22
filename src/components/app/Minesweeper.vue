<template>
  <main class="minesweeper">
    <MenuList class="minesweeper__menu"/>
    <span :class="{ 'minesweeper__cells--finished': isGameLoose || isGameVictory }">
      <CellsList class="minesweeper__cells"/>
    </span>

    <div v-if="isGameLoose" class="minesweeper__loose">
      You have lost, <a href="/">restart?</a>
    </div>

    <div v-if="isGameVictory" class="minesweeper__victory">
      You have won, good game! Do you want to <a href="/">restart?</a>
    </div>
  </main>
</template>

<script setup lang="ts">
  import type { Minesweeper } from '@/ts/types'
  import MenuList from "@/components/app/MenuList.vue";
  import CellsList from "@/components/app/CellsList.vue";
  import { useStore } from "@/stores/store";
  import {computed} from "vue";

  const props = defineProps<Minesweeper>()
  const store = useStore()

  const isGameLoose = computed(() => {
    return store.$state.gameStatus === 'loose'
  })

  const isGameVictory = computed(() => {
    return store.$state.gameStatus === 'victory'
  })

  store.setBombsCount(props.bombs)
</script>

<style scoped lang="scss">
  .minesweeper {
    gap: 1rem;
    display: flex;
    margin: 0 auto;
    max-width: 800px;
    flex-direction: column;

    @media (max-width: 450px) {
      padding: 0 1rem;
    }

    &__menu {
      margin-top: 1rem;
    }

    &__cells {
      display: flex;
      aspect-ratio: 1 / 1;
      flex-direction: column;

      &--finished {
        pointer-events: none;
      }
    }

    &__loose {
      flex: 1;
    }
  }
</style>