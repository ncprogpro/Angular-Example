import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FileUploadModule } from 'ng2-file-upload';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropCropResizeModule } from "drag-drop-crop-resize"
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';

import { EditTemplateSidebarComponent } from '@structure/admin/edit-template-sidebar/edit-template-sidebar.component';
import { ApproveTemplateComponent } from '@structure/admin/approve-template/approve-template.component';
import { DeleteTemplateComponent } from '@structure/admin/delete-template/delete-template.component';
import { AssignCountriesComponent } from '@structure/admin/assign-countries/assign-countries.component';
import { CategoryManagerSidebarComponent } from '@structure/admin/category-manager-sidebar/category-manager-sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from '@shared/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    EditTemplateSidebarComponent,
    ApproveTemplateComponent,
    DeleteTemplateComponent,
    AssignCountriesComponent,
    CategoryManagerSidebarComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    ImageCropperModule, 
    FileUploadModule, 
    MatDialogModule, 
    MatTabsModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatTableModule,
    DragDropCropResizeModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
