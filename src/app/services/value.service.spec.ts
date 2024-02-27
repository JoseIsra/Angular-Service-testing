import { TestBed } from '@angular/core/testing';
import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValueService],
    });
    // inyectamos la dependecia para testear
    service = TestBed.inject(ValueService);
  });

  it('Debio crearse la instancia', () => {
    expect(service).toBeTruthy();
  });

  describe('Test for getValue', () => {
    //AAA
    //arrange
    // act
    //assert
    it('Debería retornar el valor del value', () => {
      expect(service.getValue()).toBe('my  value');
    });
  });
  describe('Test for SetValue', () => {
    it('Debería cambiar el valor del value', () => {
      expect(service.getValue()).toBe('my  value');

      service.setValue('Isra');
      expect(service.getValue()).toBe('Isra');
    });
  });
  /**
   * Las pruebas no esperas as+incronismo
   * Cuando se presente asincronismo, debemos indicar
   * explicitamente dónde se termina la prueba con doneFn
   */
  describe('Tests for getPromiseValue', () => {
    it('Debería retornar "promise value" desde una promesa', (doneFn) => {
      service.getPromiseValue().then((res) => {
        //assert
        expect(res).toBe('promise value');
        doneFn();
      });
    });
    it('Debería retornar "promise value" desde una promesa async-await', async () => {
      const res = await service.getPromiseValue();
      expect(res).toBe('promise value');
    });
  });

  describe('Test for observable', () => {
    it('Debería retornar "Obsevable value"', (doneFn) => {
      service.getObservableValue().subscribe((data) => {
        expect(data).toBe('Observable value');
        doneFn();
      });
    });
  });
});
