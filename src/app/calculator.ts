export class Calculator {
  sum(a: number, b: number) {
    return a + b;
  }

  multiply(a: number, b: number) {
    return a * b;
  }

  substract(a: number, b: number) {
    return a - b;
  }

  divide(a: number, b: number) {
    return b === 0 ? null : a / b;
  }
}
