import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import Image from '../models/image';

@Injectable()
export class ImageDataService {
    private baseUrl: string = 'https://localhost:5000/image'

  constructor(private httpClient: HttpClient) { }

  list(): Observable<Image[]> {

    return this.httpClient.get<Image[]>(this.baseUrl)
      .pipe(
        map(value => value)
      );
  }

  add(image: File): Observable<Image> {
    const formData = new FormData();
    const fileToUpload = image
    formData.append('imageData', fileToUpload, fileToUpload.name);
    formData.append('name', image.name);
    return this.httpClient.post<Image>(this.baseUrl, formData);
  }
}