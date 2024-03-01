import { TestBed } from '@angular/core/testing';
import { ProductsService } from './product.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from '../models/product.model';
import { environment } from 'src/environments/environment';
import {
  generateManyProducts,
  generateSingleProduct,
} from '../models/product.mock';
import { generateManyCategories } from '../models/category.mock';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '@/interceptors/token.interceptor';
import { TokenService } from './token.service';

describe('Test for Product Service: Api calls', () => {
  const API_BASE = `${environment.API_URL}/api/v1`;
  let productService: ProductsService;
  //HttpTestingController para hcer mocking
  let httpController: HttpTestingController;
  let tokenService: TokenService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductsService,
        TokenService,
        // AGREGAMOS EL INTERCEPTOR PARA CARGARLO COMO SE HACE ON
        // EL APP.MODULE
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        },
      ],
    });
    productService = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('Debe crearse el servicio', () => {
    expect(productService).toBeTruthy();
  });

  describe('Pruebas para el método getAll simple', () => {
    it('Debe retornar una lista de productos', (doneFn) => {
      //arrange
      const mockData: Product[] = generateManyProducts();
      // forma de espiar bien alucinante
      spyOn(tokenService, 'getToken').and.returnValue('123');

      //act
      productService.getAllSimple().subscribe((data) => {
        //assert
        expect(data.length).toEqual(mockData.length);
        expect(data).toEqual(mockData);
        doneFn();
      });
      //arrange de la petición http
      //http config para la ruta que queremos revisar
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      // reemplazamos el resultado con el mockdatra
      const headers = req.request.headers;
      expect(headers.get('Authorization')).toEqual('Bearer 123');
      req.flush(mockData);
    });
  });
  describe('Pruebas para el método getAll COMPLETO', () => {
    it('Debe retornar una lista de productos', (doneFn) => {
      //arrange
      const mockData: Product[] = generateManyProducts(3);
      //act
      productService.getAll().subscribe((data) => {
        //assert
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });
      //arrange de la petición http
      //http config para la ruta que queremos revisar
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      // reemplazamos el resultado con el mockdatra
      req.flush(mockData);
    });

    it('Debería retornar lista de productos con impuestos', (doneFn) => {
      //arrange
      const mockData: Product[] = [
        {
          ...generateSingleProduct(),
          price: 100, // taxes  = .19 => 19
        },
        {
          ...generateSingleProduct(),
          price: 200, // taxes  = .19 => 38
        },
        {
          ...generateSingleProduct(),
          price: 0, // taxes  = .19 => 0
        },
        {
          ...generateSingleProduct(),
          price: -100, // taxes  = .19 => 0
        },
      ];

      productService.getAll().subscribe((data) => {
        //assert
        expect(data.length).toEqual(mockData.length);
        expect(data[0].taxes).toEqual(19);
        expect(data[1].taxes).toEqual(38);
        expect(data[2].taxes).toEqual(0);
        expect(data[3].taxes).toEqual(0);
        doneFn();
      });
      //arrange de la petición http
      //http config para la ruta que queremos revisar
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      // reemplazamos el resultado con el mockdatra
      req.flush(mockData);
    });

    it('Debe enviar query params with limit 10 & offset 3', (done) => {
      //arrange
      const mockData = generateManyProducts(3);
      const limit = 10;
      const offset = 3;
      //act
      productService.getAll(limit, offset).subscribe((data) => {
        //assert
        expect(data.length).toEqual(mockData.length);
        done();
      });

      //arrange http testing module
      const apiTest = `${API_BASE}/products?limit=${limit}&offset=${offset}`;
      const request = httpController.expectOne(apiTest);
      //mock resulta
      //assert
      request.flush(mockData);
      const params = request.request.params;
      expect(params.get('limit')).toEqual(String(limit));
      expect(params.get('offset')).toEqual(String(offset));
    });

    it('Debería ignorar params con limit 3 y offset 0', (done) => {
      //arrange
      const mockData = generateManyProducts(2);
      const limit = 3;
      const offset = 0;
      //act
      productService.getAll(limit, offset).subscribe((data) => {
        //assert
        expect(data.length).toEqual(mockData.length);
        done();
      });
      // arrange http method
      const testURL = `${API_BASE}/products?limit=${limit}&offset=${offset}`;
      const request = httpController.expectOne(testURL);
      request.flush(mockData);
      //assert params
      const params = request.request.params;
      expect(params.get('limit')).toBe(String(limit));
      expect(params.get('offset')).toBe(String(offset));
    });
    it('Debería ignorar params con limit 3 y offset undefined', (done) => {
      //arrange
      const mockData = generateManyProducts(2);
      const limit = 3;
      const offset = undefined;
      //act
      productService.getAll(limit, offset).subscribe((data) => {
        //assert
        expect(data.length).toEqual(mockData.length);
        done();
      });
      // arrange http method
      const testURL = `${API_BASE}/products`;
      const request = httpController.expectOne(testURL);
      request.flush(mockData);
      //assert params
      const params = request.request.params;
      expect(params.get('limit')).toBeNull();
      expect(params.get('offset')).toBeNull();
    });
  });

  describe('GET BY CATEGORY', () => {
    it('Debería listar todas las categorías', (done) => {
      //arrange
      const catgId = '2';
      const mockCatg = generateManyCategories(3);
      //act
      productService.getByCategory(catgId).subscribe((data) => {
        //assert
        expect(data.length).toEqual(mockCatg.length);
        done();
      });

      const testURL = `${API_BASE}/categories/${catgId}/products`;
      const request = httpController.expectOne(testURL);
      request.flush(mockCatg);
    });
    it('Debería listar las categorías con limit 10 y offset 4', (done) => {
      //arrange
      const catgId = '2';
      const limit = 10;
      const offset = 4;
      const mockCatg = generateManyCategories(3);
      //act
      productService.getByCategory(catgId, limit, offset).subscribe((data) => {
        //assert
        expect(data.length).toEqual(mockCatg.length);
        done();
      });

      const testURL = `${API_BASE}/categories/${catgId}/products?limit=${limit}&offset=${offset}`;
      const request = httpController.expectOne(testURL);
      request.flush(mockCatg);
      const params = request.request.params;
      expect(params.get('limit')).toBe(String(limit));
      expect(params.get('offset')).toBe(String(offset));
    });
  });

  describe('Test para #create OPERATION', () => {
    it('Deberaía retornar un nuevo producto', (done) => {
      //arrange
      const mockData = generateSingleProduct();
      const dto: CreateProductDTO = {
        title: 'producto',
        price: 12,
        images: [''],
        description: 'creation',
        categoryId: 2,
        taxes: 10,
      };
      //act
      productService.create({ ...dto }).subscribe((data) => {
        //assert
        expect(data).toEqual(mockData);
        done();
      });
      const apiURL = `${API_BASE}/products`;
      const request = httpController.expectOne({
        url: apiURL,
        method: 'POST',
      });
      request.flush(mockData);
      expect(expect(request.request.body).toEqual(dto)).withContext(
        'El dto debe ser igual al cuerpo de envio ',
      );
      expect(request.request.method).toBe('POST');
    });
  });

  describe('TEST PARA #delete', () => {
    it('Debe eliminar un registro', (done) => {
      //arrange
      const testId = '1';
      //act
      productService.delete(testId).subscribe((res) => {
        expect(res).toBeTrue();
        done();
      });

      // arrange http controler
      const testApi = `${API_BASE}/products/${testId}`;
      const request = httpController.expectOne({
        url: testApi,
        method: 'deletE',
      });
      request.flush(true);
      expect(request.request.method).toBe('DELETE');
    });
    it('Debe retornar false si no existe el registro', (done) => {
      //arrange
      const testId = '1';
      //act
      productService.delete(testId).subscribe((res) => {
        expect(res).toBeFalse();
        done();
      });

      // arrange http controler
      const testApi = `${API_BASE}/products/${testId}`;
      const request = httpController.expectOne({
        url: testApi,
        method: 'deletE',
      });
      request.flush(false);
      expect(request.request.method).toBe('DELETE');
    });
  });

  describe('Test #UPDATE method', () => {
    it('Debería actualizar un producto', () => {
      const testId = '1';
      const newProduct: Product = generateSingleProduct();

      const dtoUpdate: UpdateProductDTO = {
        categoryId: 2,
        description: 'Nueva description test',
      };

      productService.update(testId, { ...dtoUpdate }).subscribe((data) => {
        expect(data).toEqual(newProduct);
      });

      const testUrl = `${API_BASE}/products/${testId}`;
      const request = httpController.expectOne({
        url: testUrl,
        method: 'PUT',
      });
      request.flush(newProduct);
      expect(request.request.body).toEqual(dtoUpdate);
      expect(request.request.method).toBe('PUT');
    });
  });
  describe('Test FOR GETONE', () => {
    it('Debería retornar un producto', (done) => {
      const testId = '1';
      const mockProduct: Product = generateSingleProduct();

      productService.getOne(testId).subscribe((data) => {
        expect(data).toEqual(mockProduct);
        done();
      });

      const testUrl = `${API_BASE}/products/${testId}`;
      const request = httpController.expectOne({
        url: testUrl,
        method: 'GET',
      });
      request.flush(mockProduct);
      expect(request.request.method).toBe('GET');
    });
    it('Debe retornar mensaje correcto al error código 404', (done) => {
      const testId = '1';
      const msgError = '404 message';
      const mockError = {
        status: 404,
        statusText: msgError,
      };
      productService.getOne(testId).subscribe({
        error: (error) => {
          //assert
          expect(error).toEqual('El producto no existe');
          done();
        },
      });

      const testUrl = `${API_BASE}/products/${testId}`;
      const request = httpController.expectOne({
        url: testUrl,
        method: 'GET',
      });
      request.flush(msgError, mockError);
      expect(request.request.method).toBe('GET');
    });

    it('Debe retornar mensaje correcto al error código 401', (done) => {
      const testId = '1';
      const msgError = '401 message';

      productService.getOne(testId).subscribe({
        error: (error) => {
          //assert
          expect(error).toEqual('No estas permitido');
          done();
        },
      });

      const testUrl = `${API_BASE}/products/${testId}`;
      const request = httpController.expectOne({
        url: testUrl,
        method: 'GET',
      });
      request.flush(msgError, {
        status: 401,
        statusText: 'Unauthorized',
      });
      expect(request.request.method).toBe('GET');
    });
    it('Debe retornar mensaje por defecto a cualquier otro error', (done) => {
      const testId = '1';
      const msgError = '429 message';

      productService.getOne(testId).subscribe({
        error: (error) => {
          //assert
          expect(error).toEqual('Ups algo salio mal');
          done();
        },
      });

      const testUrl = `${API_BASE}/products/${testId}`;
      const request = httpController.expectOne({
        url: testUrl,
        method: 'GET',
      });
      request.flush(msgError, {
        status: 429,
        statusText: 'Too many request bro',
      });
      expect(request.request.method).toBe('GET');
    });
  });
});
