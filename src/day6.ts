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
  const data = await parseDay6();
  return day6Pt2BizLogic(data);
}

export function day6Pt1BizLogic(data: string[]): number {
  const board = new Board(data);
  while (!board.hasFinished()) {
    board.moveGuard();
  }
  return board.visitedLocationsCount();
}

export function day6Pt2BizLogic(data: string[]): number {
  const loopObjectPos: [number, number][] = [];
  const finishedBoard = new Board(data);
  while (!finishedBoard.hasFinished()) {
    finishedBoard.moveGuard();
  }
  const walkedLocs = finishedBoard.visitedLocations;
  for (const walkedLoc of walkedLocs) {
    const board = new Board(data);
    board.setObstacle(walkedLoc.x, walkedLoc.y);
    while (!board.inLoop) {
      board.moveGuard();
      if (board.hasFinished()) {
        break;
      }
    }
    if (board.inLoop) {
      loopObjectPos.push([walkedLoc.x, walkedLoc.y]);
    }
  }
  // const maxRow = data.length - 1;
  // const maxCol = data[0].length - 1;
  // for (let i = 0; i <= maxRow; i++) {
  //   for (let j = 0; j <= maxCol; j++) {
  //     const board = new Board(data);
  //     board.setObstacle(i, j);
  //     while (!board.inLoop) {
  //       board.moveGuard();
  //       if (board.hasFinished()) {
  //         break;
  //       }
  //     }
  //     if (board.inLoop) {
  //       loopObjectPos.push([i, j]);
  //     }
  //   }
  // }
  return loopObjectPos.length;
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
  visitedLocations: VisitedLocation[] = [];
  private guardOrientation: GuardOrientation = GuardOrientation.Up;
  private inLoopSet: [VisitedLocation, GuardOrientation][] = [];
  public inLoop: boolean = false;

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
          const visitedLocation = { x: i, y: j };
          this.visitedLocations.push(visitedLocation);
          this.inLoopSet.push([visitedLocation, this.guardOrientation]);
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
    const visitedLocation = { x: newPosition[0], y: newPosition[1] };
    if (
      !this.visitedLocations.some(
        (loc) => loc.x === visitedLocation.x && loc.y === visitedLocation.y,
      )
    ) {
      this.visitedLocations.push(visitedLocation);
    }
    if (
      this.inLoopSet.some(
        ([vl, go]) =>
          vl.x === visitedLocation.x &&
          vl.y === visitedLocation.y &&
          go === this.guardOrientation,
      )
    ) {
      this.inLoop = true;
    } else {
      this.inLoopSet.push([visitedLocation, this.guardOrientation]);
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

  public setObstacle(x: number, y: number) {
    this.board[x][y] = Cell.Obstacle;
  }
}
