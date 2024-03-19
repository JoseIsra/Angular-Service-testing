import { ValueService } from '@/services/value.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private valueService: ValueService,
    private productService: ProductsService,
  ) {}
  products: Product[] = [];

  limit = 10;
  offset = 0;
  status: 'loading' | 'success' | 'error' | 'init' = 'init';

  valueData = '';

  getAllProducts() {
    this.status = 'loading';
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = [...this.products, ...data];
        this.offset += this.limit;
        this.status = 'success';
      },
      error: () => {
        setTimeout(() => {
          this.products = [];
          this.status = 'error';
        }, 3000);
      },
    });
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  async callPromise() {
    this.valueData = await this.valueService.getPromiseValue();
  }
}
