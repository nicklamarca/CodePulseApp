import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blogpost-list',
  standalone: true,
  imports: [RouterLink, CommonModule, HttpClientModule],
  templateUrl: './blogpost-list.component.html',
  styleUrl: './blogpost-list.component.css'
})
export class BlogpostListComponent {

  blogPosts$: Observable<BlogPost[]> | undefined;

  constructor(private blogPostService: BlogPostService)
  {}

  ngOnInit(): void {
      this.blogPosts$ = this.blogPostService.getAllBlogPosts();
    }

}
