import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddCategoryRequest } from '../models/add-category-request-model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnDestroy {

  model: AddCategoryRequest;
  private addCategorySubscription: Subscription | undefined;

  constructor(private categoryService: CategoryService, 
              private router: Router)
  {
    this.model = {
      name: '',
      urlHandle: ''
    };
  }


  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }

  onFormSubmit()
  {
   this.addCategorySubscription = this.categoryService.addCategory(this.model)
    .subscribe({
      next: (response) =>{
        this.router.navigateByUrl('/admin/categories');
      },
      error: (error) =>{
        console.log(error);
      }
    })
  }

}
