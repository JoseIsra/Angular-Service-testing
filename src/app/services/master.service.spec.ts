import { MasterService } from './master.service';
import { ValueService } from './value.service';
import { TestBed } from '@angular/core/testing';

describe('MasterService', () => {
  let masterService: MasterService;
  let valueServiceSpy!: jasmine.SpyObj<ValueService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ValueService', ['getValue']);

    TestBed.configureTestingModule({
      providers: [
        MasterService,
        {
          provide: ValueService,
          useValue: spy,
        },
      ],
    });
    masterService = TestBed.inject(MasterService);
    valueServiceSpy = TestBed.inject(
      ValueService,
    ) as jasmine.SpyObj<ValueService>;
  });

  it('Debe crearse el servicio', () => {
    expect(masterService).toBeTruthy();
  });
  // it('should return "my  value" dsde el servicio real ValueService', () => {
  //   const valueService = new ValueService();
  //   const masterService = new MasterService(valueService);
  //   expect(masterService.getValue()).toBe('my  value');
  // });
  // it('should return "other  value" dsde un servicio fake', () => {
  //   const fakeValueService = new FakeValueService();
  //   const masterService = new MasterService(<ValueService>fakeValueService);
  //   expect(masterService.getValue()).toBe('fake value');
  // });
  // it('should return "other  value" dsde un objeto fake', () => {
  //   const fake = {
  //     getValue: () => 'fake from object',
  //   };
  //   const masterService = new MasterService(<ValueService>fake);
  //   expect(masterService.getValue()).toBe('fake from object');
  // });

  it('should llamar a getValue desde valueService', () => {
    /**
     * MOCKING SON OBJETOS SIMULADOS(CLONES) QUE
     * IMITAN EL COMPORTAMIENTO DE OBJETOS REALES
     * DE UNA FORMA CONTROLADA
     */
    // ************** CREAMOS UN MOCK QUE ES ESPIABLE **************
    const valueServiceSpy = jasmine.createSpyObj<ValueService>('ValueService', [
      'getValue',
    ]);
    valueServiceSpy.getValue.and.returnValue('fake value');
    // ===============
    const masterService = new MasterService(valueServiceSpy);
    expect(masterService.getValue()).toBe('fake value');
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  });

  it('Debe funcionar las dependencias con TestBed', () => {
    // const valueServiceSpy = jasmine.createSpyObj<ValueService>('ValueService', [
    //   'getValue',
    // ]);
    valueServiceSpy.getValue.and.returnValue('Test Bed bro');
    expect(masterService.getValue()).toBe('Test Bed bro');
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
  });
});
