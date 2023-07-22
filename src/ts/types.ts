export type GameStatus = 'defusing' | 'victory' | 'loose'

export interface Minesweeper {
  bombs: number
}

export interface MenuItem {
  icon?: string
}

export interface Cell {
  x: number
  y: number
  count: number,
  status: 'hidden' | 'visible'
  hasBomb: boolean
  hasFlag: boolean
}
