import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { ProductsService } from '@/services/product.service';
import { generateManyProducts } from '@/models/product.mock';
import { of, defer } from 'rxjs';
import { ProductComponent } from '../product/product.component';
import { ValueService } from '@/services/value.service';
import { By } from '@angular/platform-browser';

fdescribe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductsService>;
  let valueServiceSpy: jasmine.SpyObj<ValueService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj<ProductsService>('ProductsService', [
      'getAll',
    ]);

    const valueSpy = jasmine.createSpyObj<ValueService>('ValueService', [
      'getPromiseValue',
    ]);
    TestBed.configureTestingModule({
      declarations: [ProductsComponent, ProductComponent],
      providers: [
        {
          provide: ProductsService,
          useValue: spy,
        },
        {
          provide: ValueService,
          useValue: valueSpy,
        },
      ],
    });
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;

    productServiceSpy = TestBed.inject(
      ProductsService,
    ) as jasmine.SpyObj<ProductsService>;

    valueServiceSpy = TestBed.inject(
      ValueService,
    ) as jasmine.SpyObj<ValueService>;

    const productMock = generateManyProducts(3);
    productServiceSpy.getAll.and.returnValue(of(productMock));

    fixture.detectChanges(); // se ejecuta el ngOninit
  });

  it('should create', () => {
    // para correr el primer ngonInit de forma manual
    expect(component).toBeTruthy();
  });

  describe('Test for getAllProducts', () => {
    it('should return a product list from service', () => {
      //arrange
      const productMock = generateManyProducts(10);
      productServiceSpy.getAll.and.returnValue(of(productMock));
      const countProductsPrev = 3;
      //act
      component.getAllProducts();
      fixture.detectChanges();
      // expect(productElement.length).toEqual(productMock.length);
      expect(component.products.length).toEqual(
        productMock.length + countProductsPrev,
      );
    });

    it('should change the status loading => success after successful subscription', fakeAsync(() => {
      const productMock = generateManyProducts(10);
      // defer para simular un observable con delay
      productServiceSpy.getAll.and.returnValue(
        defer(() => Promise.resolve(productMock)),
      );

      //act
      component.getAllProducts();
      fixture.detectChanges();
      expect(component.status).toEqual('loading');

      // resuelve todo lo que esté pendiente, todo lo asíncrono
      // el tick depende del fakeAsync
      tick(); // execute obs, setTimeout, promise
      fixture.detectChanges();
      expect(component.status).toEqual('success');
    }));
    it('should change the status loading => success after successful subscription when button clicked', fakeAsync(() => {
      const productMock = generateManyProducts(10);
      // defer para simular un observable con delay
      productServiceSpy.getAll.and.returnValue(
        defer(() => Promise.resolve(productMock)),
      );

      //act
      const buttonDebu = fixture.debugElement.query(
        By.css('button.products-action'),
      );
      buttonDebu.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.status).toEqual('loading');

      // resuelve todo lo que esté pendiente, todo lo asíncrono
      // el tick depende del fakeAsync
      tick(); // execute obs, setTimeout, promise
      fixture.detectChanges();
      expect(component.status).toEqual('success');
    }));
    it('should change the status loading => error after rejected subscription', fakeAsync(() => {
      // defer para simular un observable con delay
      productServiceSpy.getAll.and.returnValue(
        defer(() => Promise.reject('error')),
      );

      //act
      component.getAllProducts();
      fixture.detectChanges();
      expect(component.status).toEqual('loading');

      // resuelve todo lo que esté pendiente, todo lo asíncrono
      // el tick depende del fakeAsync
      tick(3000); // execute obs, setTimeout, promise
      fixture.detectChanges();
      expect(component.status).toEqual('error');
    }));
    it('should change the status loading => error after rejected subscription while button clicked', fakeAsync(() => {
      // defer para simular un observable con delay
      productServiceSpy.getAll.and.returnValue(
        defer(() => Promise.reject('error')),
      );

      //act
      const btnDebug = fixture.debugElement.query(
        By.css('button.products-action'),
      );
      btnDebug.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.status).toEqual('loading');

      // resuelve todo lo que esté pendiente, todo lo asíncrono
      // el tick depende del fakeAsync
      tick(3000); // execute obs, setTimeout, promise
      fixture.detectChanges();
      expect(component.status).toEqual('error');
    }));
  });

  describe('TESTS FOR CALLPROMISE', () => {
    it('should call to promise callPromise', async () => {
      //arrange
      const mockedMessage = 'mocked';
      valueServiceSpy.getPromiseValue.and.returnValue(
        Promise.resolve(mockedMessage),
      );
      //act
      await component.callPromise();
      fixture.detectChanges();
      const paragraphDeb = fixture.debugElement.query(
        By.css('p[data-id="promise-test"]'),
      ).nativeElement as HTMLParagraphElement;
      //assert
      expect(paragraphDeb.textContent).toEqual(mockedMessage);
      expect(valueServiceSpy.getPromiseValue).toHaveBeenCalledTimes(1);
      expect(component.valueData).toEqual(mockedMessage);
    });
    it('should show "mocked" in <p> tag when promise button clicked', fakeAsync(() => {
      //arrange
      const mockedMessage = 'mocked';
      valueServiceSpy.getPromiseValue.and.returnValue(
        Promise.resolve(mockedMessage),
      );
      //act
      const btnPromise = fixture.debugElement.query(By.css('.promise-btn'));
      btnPromise.triggerEventHandler('click', null);
      tick();
      fixture.detectChanges();

      const paragraphDeb = fixture.debugElement.query(
        By.css('p[data-id="promise-test"]'),
      ).nativeElement as HTMLParagraphElement;
      //assert
      expect(paragraphDeb.textContent).toEqual(mockedMessage);
      expect(valueServiceSpy.getPromiseValue).toHaveBeenCalledTimes(1);
      expect(component.valueData).toEqual(mockedMessage);
    }));
  });
});
