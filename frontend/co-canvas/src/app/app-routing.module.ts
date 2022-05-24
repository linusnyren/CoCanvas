import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasComponent } from './canvas/canvas.component';
import { ImagePickerComponent } from './image-picker/image-picker.component';
import { InfoComponent } from './info/info.component';

const routes: Routes = [
  { path: '', component: CanvasComponent },
  { path: 'add', component: ImagePickerComponent },
  { path: 'info', component: InfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
