import type { Cell } from '@/ts/types'
import type { Ref } from 'vue'
import { ref } from 'vue'
import { useStore } from '@/stores/store'
import { useRandomNumber } from "@/composables/useRandomNumber";

export const useCells = (): Cell[] => {
  const cells: Cell[] = [];
  const store = useStore()

  for (let y = 0; y < store.$state.boardSize; y++) {
    for (let x = 0; x < store.$state.boardSize; x++) {
      cells.push({
        x: x,
        y: y,
        count: 0,
        status: 'hidden',
        hasBomb: false,
        hasFlag: false,
      })
    }
  }

  // Set empty cells
  store.setCells(cells)

  // Creating bombs in cells
  while (store.getCellsWithBomb().length < store.$state.bombsCount) {
    cells.map((cell: Cell): void => {
      if (cell.x === useRandomNumber(0, store.$state.boardSize - 1)
          && cell.y === useRandomNumber(0, store.$state.boardSize - 1))
          cell.hasBomb = true
    })
  }

  store.setBombsCount(store.getCellsWithBomb().length)

  // Counting surrounding cells if there are bombs
  store.$state.cells.map((cell: Cell): void => {
    if (cell.hasBomb) return
    cell.count = store.getNeighbourCells(cell.x, cell.y).filter((cell: Cell) => cell.hasBomb).length
  })

  return store.$state.cells
}
