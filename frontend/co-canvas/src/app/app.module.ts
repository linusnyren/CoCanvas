import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { CanvasComponent } from './canvas/canvas.component';
import { ImagePickerComponent } from './image-picker/image-picker.component';
import { ImageDataService } from './data/image-data.service';
import { HttpClientModule } from '@angular/common/http';
import { CloneService } from './clone.service';
import { ImageService } from './image-service';
import { ImageStoreService } from './state/image-store';
import { InfoComponent } from './info/info.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    ImagePickerComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    ImageDataService,
    ImageStoreService,
    CloneService,
    ImageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
