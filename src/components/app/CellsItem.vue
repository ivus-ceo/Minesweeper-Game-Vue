<template>
  <li class="cells-item" @click.prevent="handleClick" @contextmenu.prevent="handleContextMenu">
    <div v-if="cell.status === 'visible' || cell.hasFlag" class="cells-item__content" :data-status="cell.status" :data-count="cell.count" :data-has-flag="cell.hasFlag">
      {{ content }}
    </div>
  </li>
</template>

<script setup lang="ts">
  import type { Cell } from "@/ts/types";
  import { computed } from "vue";
  import { useStore } from "@/stores/store";
  import { useCoordinatesMatch } from "@/composables/useCoordinatesMatch";

  const props = defineProps<{ cell: Cell }>()
  const store = useStore()

  const content = computed(() => {
    if (props.cell.hasFlag) return '🚩'
    if (props.cell.hasBomb) return '💣'
    if (props.cell.status === 'visible') {
      return (props.cell.count > 0) ? props.cell.count : ''
    }
  })

  /**
   * Disarm current cell
   *
   * @param event
   * @return void
   */
  const handleClick = (event: Event): void => {
    if (props.cell.hasFlag || props.cell.status === 'visible') return

    if (props.cell.hasBomb) {
      handleLooseStatus()
      return
    }

    props.cell.status = 'visible'
    if (props.cell.count === 0) handleOpenNeighbourCells(props.cell)
    handleVictoryStatus();
  }

  /**
   * Marked current cell with the flag
   *
   * @param event
   * @return void
   */
  const handleContextMenu = (event: Event): void => {
    if (store.$state.flagsCount === store.$state.bombsCount && !props.cell.hasFlag) return

    props.cell.hasFlag = !props.cell.hasFlag
    const flagsCount = store.getCellsWithFlag().length
    store.setFlagsCount(flagsCount)

    handleVictoryStatus()
  }

  /**
   * Recursion function that opens nearby empty cells
   *
   * @param cell
   * @return void
   */
  const handleOpenNeighbourCells = (cell: Cell): void => {
    const cells: Cell[] = store.getNeighbourCells(cell.x, cell.y)

    setTimeout(() => {
      /* Loop through neighbour cells */
      cells.map((cell: Cell) => {
        if (cell.hasBomb || cell.status === 'visible') return
        cell.status = 'visible'
        if (cell.count === 0) handleOpenNeighbourCells(cell)
      })
    }, 10)
  }

  /**
   * Checks if player has won
   *
   * @return void
   */
  const handleVictoryStatus = (): void => {
    // If coordinates of flags and bombs are the same the field is defused AND all cells are visible except bombs
    if (useCoordinatesMatch(store.getCellsWithBomb(), store.getCellsWithFlag()) && store.getEmptyCells().every((cell: Cell) => cell.status === 'visible'))
      store.setGameStatus('victory')
  }

  /**
   * Checks if player has lost
   *
   * @return void
   */
  const handleLooseStatus = (): void => {
    store.$state.cells.map((cell: Cell) => {
      cell.status = 'visible'
    })

    store.setGameStatus('loose')
  }
</script>

<style scoped lang="scss">
  $cell-color: #d1d8e0;

  .cells-item {
    width: 100%;
    color: white;
    cursor: pointer;
    overflow: hidden;
    font-size: 1.5rem;
    user-select: none;
    aspect-ratio: 1 / 1;
    border-radius: 0.4rem;
    background-color: $cell-color;

    &:hover,
    &:focus {
      background-color: darken($cell-color, 5);
    }

    &__content {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      &[data-status="visible"] {
        background-color: lighten($cell-color, 10);
      }

      &[data-has-flag="true"] {
        background-color: hotpink !important;
      }

      &[data-count="1"] {
        background-color: #2d98da;
      }

      &[data-count="2"] {
        background-color: #20bf6b;
      }

      &[data-count="3"] {
        background-color: #fa8231;
      }

      &[data-count="4"] {
        background-color: #eb3b5a;
      }

      &[data-count="5"],
      &[data-count="6"],
      &[data-count="7"],
      &[data-count="8"] {
        background-color: #8854d0;
      }
    }
  }
</style>