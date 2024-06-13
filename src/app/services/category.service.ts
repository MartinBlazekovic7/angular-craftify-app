import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Category } from '../models/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http.get<Category[]>(`${environment.apiUrl}/category/all`);
  }

  editCategory(categoryData: Category) {
    return this.http.put(
      `${environment.apiUrl}/category/${categoryData.id}`,
      categoryData
    );
  }

  deleteCategory(id: number) {
    return this.http.delete(`${environment.apiUrl}/category/${id}`);
  }
}
