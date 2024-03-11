import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'e-commerce-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent implements OnInit {
  @Input() images: string[] | any;

  selectedImageUrl: string | any;

  ngOnInit(): void {
    // console.log(typeof(this.images))
    console.log(this.hasImages);
    if (this.hasImages) {
      this.selectedImageUrl = this.images[0];
      console.log(this.selectedImageUrl);
    }
  }
  changeSelectedImage(imageUrl: string) {
    this.selectedImageUrl = imageUrl;
  }

  get hasImages() {
    return this.images?.length > 0;
  }
}
