import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = `${environment.API_URL}/api/v1`;

  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }
}
