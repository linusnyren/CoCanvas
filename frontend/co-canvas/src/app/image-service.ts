import { Injectable, OnDestroy } from '@angular/core';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { ImageDataService } from './data/image-data.service';
import { ImageStoreService } from './state/image-store';
import Image from './models/image'

@Injectable()
export class ImageService {

  constructor(
    private imageData: ImageDataService,
    private imageStore: ImageStoreService,
  ) {
    this.loadImages();
  }

  isLoading$(): Observable<boolean> {
    return this.imageStore.isLoading$();
  }

  images$(): Observable<Image[]> {
    return this.imageStore.get$();
  }

  loadImages(): void {
    this.imageStore.setLoading(true);

    this.imageData.list().subscribe(policies => {
      this.imageStore.set(policies);
      this.imageStore.setLoading(false);
    });
  }

  add(imageFile: File): void {
    this.imageStore.setLoading(true);

    this.imageData.add(imageFile).subscribe(res => {
      this.imageStore.add(res);
      this.imageStore.setLoading(false);
    });
  }
}
