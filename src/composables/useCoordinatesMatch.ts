import type {Cell} from "@/ts/types";

export const useCoordinatesMatch = (cells1: Cell[], cells2: Cell[]): boolean => {
    if (cells1.length !== cells2.length) return false;

    return cells1.every((cell: Cell, index: number) => {
        return cell.x === cells2[index].x && cell.y === cells2[index].y
    })
}