import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../category/models/category.model';
import { ImageSelectorComponent } from '../../../shared/components/image-selector/image-selector.component';
import { ImageService } from '../../../shared/components/image-selector/image.service';

@Component({
  selector: 'app-add-blogpost',
  standalone: true,
  imports: [FormsModule, CommonModule, MarkdownModule, ImageSelectorComponent],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnInit, OnDestroy {

  model: AddBlogPost;
  categories$: Observable<Category[]> | undefined;
  imageSelectorVisible: boolean = false;
  imageSelectorSubscription: Subscription | undefined;

  constructor(private blogPostService: BlogPostService, 
              private router: Router,
              private categoryService: CategoryService,
              private imageService: ImageService) 
  {
    this.model = {
      title: '',
      urlHandle: '',
      shortDescription: '',
      content: '',
      featuredImageUrl: '',
      publishedDate: new Date(),
      author: '',
      isVisible: true,
      categories: []
    }
  }
  ngOnDestroy(): void {
    this.imageSelectorSubscription?.unsubscribe();
  }
  ngOnInit(): void {
     this.categories$ = this.categoryService.getAllCategories();

     this.imageSelectorSubscription = this.imageService.onSelectImage()
     .subscribe({
       next: (selectedImage) => {
         if(this.model)
         {
           this.model.featuredImageUrl = selectedImage.url;
           this.closeImageSelector();
         }
       }
     });
  }

  onFormSubmit(): void {
    console.log(this.model);
    this.blogPostService.createBlogPost(this.model).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/blogposts');
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  openImageSelector():void
  {
    this.imageSelectorVisible = true;
  }

  closeImageSelector():void
  {
    this.imageSelectorVisible = false;
  }



}
