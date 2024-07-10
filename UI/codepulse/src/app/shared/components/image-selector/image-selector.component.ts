import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ImageService } from './image.service';
import { BlogImage } from './models/blog-image.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-selector',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.css'
})
export class ImageSelectorComponent implements OnInit {

   private file: File | undefined;
   fileName: string = '';
   title: string = '';
   images$: Observable<BlogImage[]> | undefined;

   @ViewChild('form', {static: false}) imageUploadForm: NgForm | undefined;

  constructor(private imageService: ImageService)
  {}


   ngOnInit(): void {
       this.getImages();
   }

   private getImages(): void
   {
      this.images$ = this.imageService.getAllImages();
   }

   selectImage(image: BlogImage): void
   {
      this.imageService.selectImage(image);
   }

  uploadImage():void
  {
     if (this.file && this.fileName !== ''   && this.title !== '')
     {
       //Image Service to upload the image
       this.imageService.uploadImage(this.file, this.fileName, this.title).subscribe(
        {
           next: (response) => {
            this.imageUploadForm?.reset();
            this.getImages();
           },
           error: (error) => {
            console.log(error);
           }
        });
     }
  }

  onFileUploadChange(event: Event):void
  {
     const element = event.target as HTMLInputElement;
     this.file = element.files?.[0];
     
  }
}
