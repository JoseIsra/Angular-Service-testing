import { TestBed } from '@angular/core/testing';

import { ManService } from './man.service';
import { WomanService } from './woman.service';

describe('ManService', () => {
  let manService: ManService;
  let womanSpyService: jasmine.SpyObj<WomanService>;

  beforeEach(() => {
    const mywomanSpy = jasmine.createSpyObj<WomanService>('WomanService', [
      'getWomanName',
    ]);

    TestBed.configureTestingModule({
      providers: [
        ManService,
        {
          provide: WomanService,
          useValue: mywomanSpy,
        },
      ],
    });
    manService = TestBed.inject(ManService);
    womanSpyService = TestBed.inject(
      WomanService,
    ) as jasmine.SpyObj<WomanService>;
  });

  it('should be created', () => {
    expect(manService).toBeTruthy();
  });

  it('Debe espiar la ejecución del metodo de Woman', () => {
    // manera manual en cada test

    // 1. crear el spy
    const womanSpy = jasmine.createSpyObj<WomanService>('WomanService', [
      'getWomanName',
    ]);
    // 2.  mockear el spy
    womanSpy.getWomanName.and.returnValue('Mi novia se llama Belen');
    // 3. ejecutar lo que has mockeado desde el servicio real
    const manService = new ManService(womanSpy);
    // expect(manService.getPartnerName()).toBe('Mi novia se llama Belen');
    manService.getPartnerName();
    // 4. comprobar que lo que testeas, sea exitoso
    expect(womanSpy.getWomanName).toHaveBeenCalled();
  });

  it('Debe espiar globalmente ejecución del método de Woman', () => {
    // 1. crear spy globarl -> done
    // 2. mockear spy global -> sone
    womanSpyService.getWomanName.and.returnValue('Global Belen love');
    // 3. ejecutar el método a probar
    expect(manService.getPartnerName()).toBe('Global Belen love');
    // 4. evaluemos lo que queremos probar
    expect(womanSpyService.getWomanName).toHaveBeenCalled();
    expect(womanSpyService.getWomanName).toHaveBeenCalledTimes(1);
  });

  it('Debe espiar globalemnte con variable stub', () => {
    const stubValue = 'My love';
    // 2. mockeo time
    womanSpyService.getWomanName.and.returnValue(stubValue);
    // 3. Act
    expect(manService.getPartnerName())
      .withContext('service returned stub value')
      .toBe(stubValue);

    // 4. assert
    expect(womanSpyService.getWomanName.calls.count())
      .withContext('spy method was called once')
      .toBe(1);
  });
});
