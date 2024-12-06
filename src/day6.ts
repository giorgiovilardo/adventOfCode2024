import { readFile } from "./readFile";

async function parseDay6() {
  const data = await readFile("day6.txt");
  return data.split("\n");
}

export async function partOne(): Promise<number> {
  const data = await parseDay6();
  return day6Pt1BizLogic(data);
}

export async function partTwo(): Promise<number> {
  return 0;
}

export function day6Pt1BizLogic(data: string[]): number {
  const board = new Board(data);
  while (!board.hasFinished()) {
    board.moveGuard();
  }
  return board.visitedLocationsCount();
}

enum Cell {
  Obstacle = "#",
  Free = ".",
}

enum GuardOrientation {
  Up = "^",
  Left = "<",
  Right = ">",
  Down = "v",
}

type VisitedLocation = { x: number; y: number };

class Board {
  private board: Cell[][];
  private readonly originalBoard: string[];
  private guardPosition: [number, number] = [-2, -2];
  private visitedLocations: VisitedLocation[] = [];
  private guardOrientation: GuardOrientation = GuardOrientation.Up;

  constructor(board: string[]) {
    this.originalBoard = board;
    this.board = [];
    for (let i = 0; i < board.length; i++) {
      const cellRow: Cell[] = [];
      for (let j = 0; j < board[i].length; j++) {
        const cell = board[i][j];
        if (cell === ".") {
          cellRow.push(Cell.Free);
        }
        if (cell === "^") {
          cellRow.push(Cell.Free);
          this.guardPosition = [i, j];
          this.visitedLocations.push({ x: i, y: j });
        }
        if (cell === "#") {
          cellRow.push(Cell.Obstacle);
        }
      }
      this.board.push(cellRow);
    }
  }

  public hasFinished() {
    return this.guardPosition[0] === -1 && this.guardPosition[1] === -1;
  }

  public moveGuard() {
    const modifier = this.modifier();
    const newPosition: [number, number] = [
      this.guardPosition[0] + modifier[0],
      this.guardPosition[1] + modifier[1],
    ];
    if (
      newPosition[0] < 0 ||
      newPosition[0] > this.board.length - 1 ||
      newPosition[1] < 0 ||
      newPosition[1] > this.board[0].length - 1
    ) {
      this.guardPosition = [-1, -1];
      return;
    }
    if (this.board[newPosition[0]][newPosition[1]] === Cell.Obstacle) {
      this.turnGuardRight();
      return;
    }
    this.guardPosition = newPosition;
    if (
      !this.visitedLocations.some(
        (loc) => loc.x === newPosition[0] && loc.y === newPosition[1],
      )
    ) {
      this.visitedLocations.push({ x: newPosition[0], y: newPosition[1] });
    }
  }

  private turnGuardRight() {
    switch (this.guardOrientation) {
      case GuardOrientation.Up:
        this.guardOrientation = GuardOrientation.Right;
        break;
      case GuardOrientation.Left:
        this.guardOrientation = GuardOrientation.Up;
        break;
      case GuardOrientation.Right:
        this.guardOrientation = GuardOrientation.Down;
        break;
      case GuardOrientation.Down:
        this.guardOrientation = GuardOrientation.Left;
        break;
    }
  }

  private modifier(): [number, number] {
    switch (this.guardOrientation) {
      case GuardOrientation.Up:
        return [-1, 0];
      case GuardOrientation.Left:
        return [0, -1];
      case GuardOrientation.Right:
        return [0, 1];
      case GuardOrientation.Down:
        return [1, 0];
    }
  }

  public toString() {
    let str = "";
    for (let i = 0; i < this.originalBoard.length; i++) {
      for (let j = 0; j < this.originalBoard[i].length; j++) {
        if (this.visitedLocations.some((loc) => loc.x === i && loc.y === j)) {
          str += "X";
        } else if (this.board[i][j] === Cell.Obstacle) {
          str += "#";
        } else {
          str += ".";
        }
      }
      str += "\n";
    }
    return str;
  }

  public visitedLocationsCount(): number {
    return this.visitedLocations.length;
  }
}
