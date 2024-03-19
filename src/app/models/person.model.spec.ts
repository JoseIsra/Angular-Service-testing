import { Person } from './person.model';

describe('Test for Person Class', () => {
  it('Should create a person', () => {
    const person = new Person('isra', 'diaz', 26, -10, 0);
    expect(person).toBeTruthy();
  });

  it('deber retornar not found con altura cero y peso cero', () => {
    const person = new Person('isra', 'diaz', 26, -10, 0);

    expect(person.calcImc()).toEqual('Not found');
  });
  it('deber retornar not found con altura 1 y peso negativo', () => {
    const person = new Person('isra', 'diaz', 26, -10, 0);
    expect(person.calcImc()).toEqual('Not found');
  });

  describe('Calculo de Indice de masa corporal', () => {
    it('Debe retornar imc = Normal', () => {
      const person = new Person('isra', 'diaz', 26, 64, 1.64);
      expect(person.calcImc()).toEqual('Normal');
    });
    it('Debe retornar imc = Bajo', () => {
      const person = new Person('isra', 'diaz', 26, 44, 1.64);
      expect(person.calcImc()).toEqual('Bajo');
    });
    it('Debe retornar imc = Overweight', () => {
      const person = new Person('isra', 'diaz', 26, 81, 1.64);
      expect(person.calcImc()).toEqual('Overweight');
    });
    it('Debe retornar imc = Overweight:LEVEL 1', () => {
      const person = new Person('isra', 'diaz', 26, 90, 1.64);
      expect(person.calcImc()).toEqual('Overweight:LEVEL 1');
    });
    it('Debe retornar imc = Overweight:LEVEL 2', () => {
      const person = new Person('isra', 'diaz', 26, 98, 1.64);
      expect(person.calcImc()).toEqual('Overweight:LEVEL 2');
    });
    it('Debe retornar imc = Overweight:LEVEL 3', () => {
      const person = new Person('isra', 'diaz', 26, 110, 1.64);
      expect(person.calcImc()).toEqual('Overweight:LEVEL 2');
    });
  });
});
