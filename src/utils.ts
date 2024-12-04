export function sum(a: number, v: number): number {
  return a + v;
}

export function transposeArray<T>(a: T[][]): T[][] {
  const outerLength = a.length;
  const innerLength = a[0].length;
  const result: T[][] = [];
  for (let i = 0; i < innerLength; i++) {
    const newRow: T[] = [];
    for (let j = 0; j < outerLength; j++) {
      newRow.push(a[j][i]);
    }
    result.push(newRow);
  }
  return result;
}

export function transposeStringArray(a: string[]): string[] {
  const outerLength = a.length;
  const innerLength = a[0].length;
  const result: string[] = [];
  for (let i = 0; i < innerLength; i++) {
    const newRow: string[] = [];
    for (let j = 0; j < outerLength; j++) {
      newRow.push(a[j][i]);
    }
    result.push(newRow.join(""));
  }
  return result;
}

export function transposeStringArrayToDiagonals(arr: string[]): {
  ltr: string[];
  rtl: string[];
} {
  const numRows = arr.length;
  const numCols = arr[0].length;
  const ltrResult: string[] = [];
  const rtlResult: string[] = [];

  // Transpose for LTR diagonals
  for (let d = -(numRows - 1); d <= numCols - 1; d++) {
    let ltrDiag = "";
    for (let row = 0; row < numRows; row++) {
      const col = row + d;
      if (col >= 0 && col < numCols) {
        ltrDiag += arr[row][col];
      }
    }
    if (ltrDiag) {
      ltrResult.push(ltrDiag);
    }
  }

  // Transpose for RTL diagonals
  for (let d = 0; d <= numRows + numCols - 2; d++) {
    let rtlDiag = "";
    for (let row = 0; row < numRows; row++) {
      const col = d - row;
      if (col >= 0 && col < numCols) {
        rtlDiag += arr[row][col];
      }
    }
    if (rtlDiag) {
      rtlResult.push(rtlDiag);
    }
  }

  return { ltr: ltrResult, rtl: rtlResult };
}
