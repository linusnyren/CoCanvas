import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ImageService } from '../image-service';
import Image from '../models/image';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  images$: Observable<Image[]>;
  constructor(private router: Router, private imageService: ImageService) {
    this.images$ = this.imageService.images$();
  }

  ngOnInit(): void {
  }

  goToAddImages(): void{
    this.router.navigate(['add']);
  }
}
