import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  ButtonModule } from 'primeng/button';
@Component({
  selector: 'ui-banner',
  standalone: true,
  imports: [ButtonModule,CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {

}
