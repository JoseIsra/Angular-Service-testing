import { Calculator } from './calculator';

/**
 * fdescribe -> focus en un suite
 * xdescribe -> ignora un suite
 * xit -> ignora un test
 * fit -> focus un test
 */

// FOCO DESCRIBE
// TO INDICAR QUE SOLO QUEREMOS FOCUSEAR ESTE SUITE DE PRUEBAS
describe('Test for Calculator util class', () => {
  describe('Tests for multiply', () => {
    it('#multiply debe retornar un 40', () => {
      //AAA
      //Arrange
      const calculator = new Calculator();
      //Act
      const rta = calculator.multiply(4, 10);
      //Assert
      expect(rta).toEqual(40);
    });
    it('#multiply debe retornar un 4', () => {
      //AAA
      //Arrange
      const calculator = new Calculator();
      //Act
      const rta = calculator.multiply(2, 2);
      //Assert
      expect(rta).toEqual(4);
    });
  });

  describe('Tests for divide', () => {
    it('#divide Debe retornar un 10', () => {
      //AAA
      //Arrange
      const calculator = new Calculator();
      //Act
      const rta = calculator.divide(50, 5);
      //Assert
      expect(rta).toEqual(10);
    });
    it('#divide Debe retornar null al dividir por cero', () => {
      //AAA
      //Arrange
      const calculator = new Calculator();
      //Act
      const rta = calculator.divide(50, 0);
      //Assert
      expect(rta).toBeNull();
    });
  });

  describe('Tests for substract', () => {
    it('#substract el residuio debe ser 9', () => {
      const calcu = new Calculator();
      const rta = calcu.substract(18, 9);
      expect(rta).toEqual(9);
    });
  });

  describe('tests for Sum', () => {
    it('#sum Debe mostrar la suma de 100', () => {
      const calc = new Calculator();
      const rta = calc.sum(50, 50);
      expect(rta).toEqual(100);
    });
  });
});
