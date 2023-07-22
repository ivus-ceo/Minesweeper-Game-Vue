<template>
  <div class="cells-list">
    <ul class="cells-list__row" v-for="(row, i) in cells" :key="i">
      <CellsItem v-for="(cell, j) in row"
                 :key="j"
                 :cell="cell"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
  import CellsItem from "@/components/app/CellsItem.vue";
  import { useStore } from "@/stores/store";
  import { useCells } from "@/composables/useCells";

  const store = useStore()
  const cells = chunks(useCells(), store.$state.boardSize)

  /**
   * Generates array chunks
   *
   * @param array
   * @param n
   */
  function* chunks<T>(array: T[], n: number): Generator<T[], void> {
    for (let i = 0; i < array.length; i += n) {
      yield array.slice(i, i + n);
    }
  }
</script>

<style scoped lang="scss">
  $gap: 1px;

  .cells-list {
    gap: $gap;
    display: flex;
    position: relative;
    flex-direction: column;

    &--lost::before {
      width: 100%;
      height: 100%;
      background-color: rgba(black, 0.5);

      @include pseudo();
    }

    &__row {
      gap: $gap;
      display: flex;
      list-style: none;
    }
  }
</style>