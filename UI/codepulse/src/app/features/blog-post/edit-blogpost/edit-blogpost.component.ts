import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { UpdateBlogPost } from '../models/update-blog-post.model';

@Component({
  selector: 'app-edit-blogpost',
  standalone: true,
  imports: [FormsModule, CommonModule, MarkdownModule],
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.css'
})
export class EditBlogpostComponent implements OnInit, OnDestroy {

  id:string | null = null;
  model: BlogPost | undefined;
  categories$: Observable<Category[]> | undefined;
  selectedCategories: string[] | undefined;

  routeSubscription: Subscription | undefined;
  updateBlogPostSubscription: Subscription | undefined;
  getBlogPostSubscription: Subscription | undefined;
  deleteBlogPostSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute,
              private blogPostService: BlogPostService,
              private categoryService: CategoryService,
              private router: Router
  ) {}


  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();

  }

  onDelete():void
  {
    if(this.id)
    {
    this.deleteBlogPostSubscription = this.blogPostService.deleteBlogPost(this.id).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/blogposts');
      },
      error: (error) => {
        console.error(error);
      }
    });
   }
  }

  onFormSubmit():void
  {
    //Convert model to request obj
    if(this.model  && this.id)
    {
       var updateBlogPost: UpdateBlogPost = {
        author: this.model.author,
        content: this.model.content,
        featuredImageUrl: this.model.featuredImageUrl,
        isVisible: this.model.isVisible,
        publishedDate: this.model.publishedDate,
        shortDescription: this.model.shortDescription,
        title: this.model.title,
        urlHandle: this.model.urlHandle,
        categories: this.selectedCategories ?? []
       }

       this.updateBlogPostSubscription = this.blogPostService.updateBlogPost(this.id, updateBlogPost).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/blogposts');
        },
        error: (error) => {
          console.error(error);
        }
       });
    }
  }

  ngOnInit(): void {
   
   this.categories$ = this.categoryService.getAllCategories();
  
   this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        //Get BlogPost from API
        if(this.id)
        {
            this.getBlogPostSubscription = this.blogPostService.getBlogPostById(this.id).subscribe({
              next: (response) => {
                this.model = response;
                this.selectedCategories = response.categories.map(c => c.id);
              },
              error: (error) => {
                console.error(error);
              }
            }
        );
        }
      
      }
    })
  }



}
