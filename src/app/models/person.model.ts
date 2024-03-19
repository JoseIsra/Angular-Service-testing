export class Person {
  constructor(
    public name: string,
    public lastname: string,
    public age: number,
    public weight: number,
    public height: number,
  ) {}

  calcImc(): string {
    const result = Math.round(this.weight / (2 * this.height));
    if (result < 0) return 'Not found';

    /*
    0 - 18 = down
    19 - 24 = normal
    25 - 26 = overweight
    27 - 29 = overweight level 1
    30 - 39 = overweight level 2
    40 >= overweight level 3
  */

    if (result >= 40) {
      return 'Overweight:LEVEL 3';
    } else if (result >= 30) {
      return 'Overweight:LEVEL 2';
    } else if (result >= 27) {
      return 'Overweight:LEVEL 1';
    } else if (result >= 25) {
      return 'Overweight';
    } else if (result >= 19) {
      return 'Normal';
    } else if (result >= 0) {
      return 'Bajo';
    } else {
      return 'Not found';
    }
  }
}
