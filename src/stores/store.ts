import { defineStore } from 'pinia'
import { ref } from "vue";
import type {Cell, GameStatus} from '@/ts/types'

export const useStore = defineStore('store', {
    state: () => {
        return {
            gameStatus: 'defusing' as GameStatus,
            cells: [] as Cell[],
            boardSize: 10 as number,
            bombsCount: 0 as number,
            flagsCount: 0 as number,
        }
    },

    actions: {
        setCells(cells: Cell[]): void {
            this.cells = cells
        },
        setBombsCount(bombsCount: number): void {
            this.bombsCount = bombsCount
        },
        setFlagsCount(flagsCount: number): void {
            this.flagsCount = flagsCount
        },
        setGameStatus(gameStatus: GameStatus): void {
            this.gameStatus = gameStatus
        },

        getNeighbourCells(x: number, y: number): Cell[] {
            return this.cells.filter((cell: Cell): boolean => {
                /* Top */
                if (cell.x === x && cell.y === y - 1) return true
                /* Left */
                if (cell.x === x - 1 && cell.y === y) return true
                /* Right */
                if (cell.x === x + 1 && cell.y === y) return true
                /* Bottom */
                if (cell.x === x && cell.y === y + 1) return true

                /* Top Left */
                if (cell.x === x - 1 && cell.y === y - 1) return true
                /* Top Right */
                if (cell.x === x + 1 && cell.y === y - 1) return true
                /* Bottom Left */
                if (cell.x === x - 1 && cell.y === y + 1) return true
                /* Bottom Right */
                if (cell.x === x + 1 && cell.y === y + 1) return true

                return false
            })
        },
        getCellsWithBomb(): Cell[] {
            return this.cells.filter((cell: Cell) => cell.hasBomb)
        },
        getCellsWithFlag(): Cell[] {
            return this.cells.filter((cell: Cell) => cell.hasFlag)
        },
        getEmptyCells(): Cell[] {
          return this.cells.filter((cell: Cell) => !cell.hasBomb)
        },
    },
})


