import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasComponent } from './canvas/canvas.component';
import { ImagePickerComponent } from './image-picker/image-picker.component';

const routes: Routes = [
  { path: '', component: CanvasComponent },
  { path: 'add', component: ImagePickerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
