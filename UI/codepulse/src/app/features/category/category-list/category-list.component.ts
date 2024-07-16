import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterLink, CommonModule, HttpClientModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {

  categories$: Observable<Category[]> | undefined;
  totalCount: number | undefined;
  list: number[] = [];
  pageNumber: number = 1;
  pageSize: number = 20;

  constructor(private categoryService: CategoryService)
  {}

  ngOnInit(): void {
   
       this.categoryService.getCategoriesCount().subscribe({
        next: (count) => {
          this.totalCount = count;
          this.list = Array(Math.ceil(count/this.pageSize));

          this.categories$ = this.categoryService.getAllCategories(undefined, 
                                                                   undefined, 
                                                                   undefined, 
                                                                   this.pageNumber, 
                                                                   this.pageSize);
        }
       });

    
    }

    onSearch(query: string): void {
       this.categories$ = this.categoryService.getAllCategories(query);  
    }

    sort(sortBy: string, sortDirection: string): void {
      this.categories$ = this.categoryService.getAllCategories(undefined, sortBy, sortDirection);
    }

    getPage(pageNumber: number): void {
      this.pageNumber = pageNumber;
      this.categories$ = this.categoryService.getAllCategories(undefined, undefined, undefined, this.pageNumber, this.pageSize);
    }

    getPrevPage(): void {

      if(this.pageNumber - 1 < 1) {
        return;
      }

      this.pageNumber -= 1;

      this.categories$ = this.categoryService.getAllCategories(undefined, undefined, undefined, this.pageNumber, this.pageSize);
    }

    getNextPage(): void {

      if(this.pageNumber + 1 > this.list.length) {
        return;
      }

      this.pageNumber += 1;

      this.categories$ = this.categoryService.getAllCategories(undefined, undefined, undefined, this.pageNumber, this.pageSize);
    }

  } 

