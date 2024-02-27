import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CategoryService } from './category.service';
import { environment } from 'src/environments/environment';
import { Category } from 'src/app/models/category.model';

fdescribe('CategoryService', () => {
  const apiUrl = `${environment.API_URL}/api/v1`;
  let service: CategoryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      // providers: [CategoryService],
    });
    service = TestBed.inject(CategoryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test getAll categories', () => {
    it('Debe listar las categorias', (doneFn) => {
      //arrange - mock
      const categoriesMock = [
        {
          id: 1,
          name: 'testing',
        },
        {
          id: 2,
          name: 'testing-2',
        },
      ];
      // act
      service.getAllCategories().subscribe((data) => {
        // assert
        expect(data.length).toEqual(categoriesMock.length);
        expect(data).toEqual(categoriesMock);
        doneFn();
      });
      // preparar la petición a probar
      const testApi = `${apiUrl}/categories`;
      const request = httpTestingController.expectOne(testApi);
      // tenemos que mockear el resultado de dicha petición get
      request.flush(categoriesMock);
      // tenemos que vigilar la petición a categorías
      httpTestingController.verify();
    });

    it('Debe retonar un arreglo vacío', (doneFn) => {
      // arrange mock data
      const categoriesMock: Category[] = [];
      // act http request
      service.getAllCategories().subscribe((data) => {
        // assert
        expect(data.length).toEqual(categoriesMock.length);
        doneFn();
      });

      // arrange http request
      const testApi = `${apiUrl}/categories`;
      const request = httpTestingController.expectOne(testApi);
      // moqueamos la solicitud HTTP
      request.flush(categoriesMock);
      // verificamos la solicitudes
      httpTestingController.verify();
    });
  });
});
