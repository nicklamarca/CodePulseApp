import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';

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

  routeSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute,
              private blogPostService: BlogPostService
  ) {}


  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  onFormSubmit()
  {
    console.log(this.model);
  }

  ngOnInit(): void {
   this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        //Get BlogPost from API
        if(this.id)
        {
            this.blogPostService.getBlogPostById(this.id).subscribe({
              next: (response) => {
                this.model = response;
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
