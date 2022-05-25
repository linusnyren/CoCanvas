import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ImageDataService } from '../data/image-data.service';
import { Router } from '@angular/router';
import { ImageService } from '../image-service';
import heic2any from "heic2any";
@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.css']
})
export class ImagePickerComponent implements OnInit {
  selectedFiles: File[] = [];
  previews: string[] = [];
  isLoading$: Observable<boolean>;

  constructor(private imageService: ImageService, private router: Router) {
    this.isLoading$ = this.imageService.isLoading$();
  }

  ngOnInit(): void {
  }

  selectFiles(event: any): void {
    for (let i = 0; i < event.target.files.length; i++) {
      this.imageService.setLoading(true);

      this.previews = [];
      let f: File;

      if (event[i] && (event[i]['lastModified'] || event[i]['lastModifiedDate'])) {
        f = event[i];
        if (event.length > 1) {
          event.splice(0, event.length - 1);
          f = event[i];
        }
      } else if (event.target && event.target.files && event.target.files[i]) {
        f = event.target.files[i];
      } else {
        throw new Error("Something went wrong");
      }

      let blob: Blob = f;
      let file: File = f;
      let convProm: Promise<any>;

      if (/image\/hei(c|f)/.test(f.type)) {
        convProm = heic2any({ blob, toType: "image/jpeg", quality: 3 }).then((jpgBlob: Blob | Blob[]) => {

          let newName = f.name.replace(/\.[^/.]+$/, ".jpg");

          if (jpgBlob) {
            file = this.blobToFile(jpgBlob, newName);
          }

        });
      } else {
        convProm = Promise.resolve(true);
      }

      convProm.then(() => {
        let reader = new FileReader();
        
        if (file) {
          reader.readAsDataURL(file);
        }
        //Listen for FileReader to get ready
        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
          this.selectedFiles.push(file);
          this.imageService.setLoading(false);
        };
      });
    }
  }


  blobToFile(theBlob: Blob | Blob[], fileName: string): File {
    let b: any = theBlob;

    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModified = new Date();
    b.name = fileName;

    //Cast to a File() type
    return <File>theBlob;
  }

  uploadFiles(): void {
    if (this.selectedFiles) {
      this.selectedFiles.forEach(image => {
        this.imageService.add(image)
      });
    }
    this.router.navigate(['/'])
  }
}
