import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { AddCategoryRequest } from '../models/add-category-request-model';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { environment } from '../../../../environments/environment';
import { UpdateCategoryRequest } from '../models/update-category-request.model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  addCategory(model: AddCategoryRequest): Observable<void>
  {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/categories`, model);
  }

  getAllCategories(query?: string, 
                   sortBy?: string, sortDirection?: string, 
                   pageNumber?: number, pageSize?: number): Observable<Category[]>
  {
  
    let myParams = new HttpParams();

    if (query) {
      myParams = myParams.set('query', query);
    }
    if (sortBy) {
      myParams = myParams.set('sortBy', sortBy);
    }
    if (sortDirection) {
      myParams = myParams.set('sortDirection', sortDirection);
    }
    if (pageNumber) {
      myParams = myParams.set('pageNumber', pageNumber);
    }
    if (pageSize) {
      myParams = myParams.set('pageSize', pageSize);
    }

    return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/categories`, { params: myParams });
  }

  getCategoryById(id: string): Observable<Category>
  {
    return this.http.get<Category>(`${environment.apiBaseUrl}/api/categories/${id}`);
  }

  updateCategory(id: string, updateCategoryRequest: UpdateCategoryRequest): Observable<Category>
  {
    return this.http.put<Category>(`${environment.apiBaseUrl}/api/categories/${id}`, 
                                    updateCategoryRequest);
  }

  deleteCategory(id: string): Observable<Category>
  {
    return this.http.delete<Category>(`${environment.apiBaseUrl}/api/categories/${id}`);
  }

  getCategoriesCount(): Observable<number>
  {
    return this.http.get<number>(`${environment.apiBaseUrl}/api/categories/count`);
  }
}
