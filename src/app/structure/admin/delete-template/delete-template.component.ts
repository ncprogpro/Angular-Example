import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, Input } from '@angular/core';
import { IDialogData } from '@core/models/IdialogData';
import { SelectionModel } from '@angular/cdk/collections';
import { AlertService } from '@core/services/alert.service';

@Component({
  selector: 'app-delete-template',
  templateUrl: './delete-template.component.html',
  styleUrls: ['./delete-template.component.scss']
})
export class DeleteTemplateComponent {

  selection = new SelectionModel(true, []);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: IDialogData,
    public dialogRef: MatDialogRef<DeleteTemplateComponent>,
    private alertService: AlertService
  ) {}

  close() {
    this.selection = new SelectionModel(true, []);
    this.dialogRef.close();
  }

  deleteTemplate(): void {
    
  }

}
