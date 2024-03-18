import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';

fdescribe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent],
    });
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Test properties component', () => {
    it('should product Input property to be null by default', () => {
      expect(component.product).toBeNull();
    });
  });
});
