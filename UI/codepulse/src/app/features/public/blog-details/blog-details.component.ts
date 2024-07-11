import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { BlogPost } from '../../blog-post/models/blog-post.model';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [FormsModule, CommonModule, MarkdownModule],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent implements OnInit {

    url: string | null = null;
    blogPost$: Observable<BlogPost> | undefined;

    constructor(private route: ActivatedRoute, private blogPostService: BlogPostService)
    {
    }

    ngOnInit(): void {
     this.route.paramMap.subscribe({
      next: (params) => {
        this.url = params.get('urlHandle');

      }
     })

       //Fetch BlogDetails By UrlHandle
      if(this.url)
      {
        this.blogPost$ = this.blogPostService.getBlogPostByUrlHandle(this.url);
      }
      
    }

  

}
