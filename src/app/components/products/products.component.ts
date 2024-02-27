import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category/category.service';
import { ProductsService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private categoryService: CategoryService,
  ) {}
  products: Product[] = [];

  getCategories() {
    this.categoryService.getAllCategories().subscribe((data) => {
      console.log(data);
    });
  }
  getAllProducts() {
    this.productService.getAllSimple().subscribe((data) => {
      console.log(
        '🚀 ~ ProductsComponent ~ this.productService.getAllSimple ~ data:',
        data,
      );
      this.products = data;
    });
  }

  ngOnInit(): void {
    this.getCategories();
    this.getAllProducts();
  }
}
