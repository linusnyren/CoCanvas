import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import Image from '../models/image';
import { ImageStoreService } from '../state/image-store';

@Injectable()
export class ImageDataService {

  constructor(private httpClient: HttpClient, private imageStore: ImageStoreService) { }

  list(): Observable<Image[]> {
    const url = `https://localhost:5004/image`;

    return this.httpClient.get<Image[]>(url)
      .pipe(
        map(value => value)
      );
  }

  add(image: File): Observable<Image> {
    const url = `https://localhost:5004/image`;
    const formData = new FormData();
    const fileToUpload = image
    formData.append('imageData', fileToUpload, fileToUpload.name);
    formData.append('name', image.name);
    return this.httpClient.post<Image>(url, formData);
  }
}