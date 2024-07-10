import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImageService } from './image.service';
import { BlogImage } from './models/blog-image.model';

@Component({
  selector: 'app-image-selector',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.css'
})
export class ImageSelectorComponent {


  constructor(private imageService: ImageService)
  {

  }

  private file: File | undefined;
  fileName: string = '';
  title: string = '';

  uploadImage():void
  {
     if (this.file && this.fileName !== ''   && this.title !== '')
     {
       //Image Service to upload the image
       this.imageService.uploadImage(this.file, this.fileName, this.title).subscribe(
        {
           next: (response) => {
            console.log(response);
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
