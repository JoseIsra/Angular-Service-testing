import { TestBed } from '@angular/core/testing';

import { MapsService } from './maps.service';

fdescribe('MapsService', () => {
  let service: MapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapsService],
    });
    service = TestBed.inject(MapsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test for getcurrentposition', () => {
    it('Debe guardar center: lat y lng', () => {
      //arrange
      // reemplazamos el resutlado del callback real con uno para mockear
      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake(
        (successFn) => {
          //  emulamos el resultado de la respuesta del navigator.geolocation
          // hacemos el mock de respuesta para la Api en uso
          const mockData = {
            coords: {
              accuracy: 0,
              altitude: 0,
              altitudeAccuracy: 0,
              heading: 0,
              longitude: 1000,
              speed: 0,
              latitude: 2000,
            },
            timestamp: 0,
          };
          // con esto indicamos que el resultado de esa api
          // será el que hemos mockeado y ese resultado lo usaremos
          // para el resto del flujo dentro del callback de nuestro método en nuestro
          // servicio
          successFn(mockData);
        },
      );
      //act
      service.getCurrentPosition();
      //assert
      expect(service.center.lat).toEqual(2000);
      expect(service.center.lng).toEqual(1000);
    });
  });
});
