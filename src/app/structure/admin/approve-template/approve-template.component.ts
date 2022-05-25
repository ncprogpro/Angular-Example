import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, Input } from '@angular/core';
import { IDialogData } from '@core/models/IdialogData';
import { SelectionModel } from '@angular/cdk/collections';
import { AlertService } from '@core/services/alert.service';

@Component({
  selector: 'app-approve-template',
  templateUrl: './approve-template.component.html',
  styleUrls: ['./approve-template.component.scss']
})
export class ApproveTemplateComponent {

  selection = new SelectionModel(true, []);
  templateApprovedFors: any;
  approvedForsNames = ["Print", "Social Media", "Web Based Video or Streaming"];
  isPrint = false;
  isSocialMedia = false;
  isWebVideo = false;
  templates: any;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: IDialogData,
    public dialogRef: MatDialogRef<ApproveTemplateComponent>,
    private alertService: AlertService
  ) {
    this.templates = data;
  }

  close() {
    this.selection = new SelectionModel(true, []);
    this.dialogRef.close();
  }

  // To set Approved for icon
  setApprovedForsIcon(name): string {
    switch (name) {
      case 'Print':
        return 'marketing:print';
      case 'Social Media':
        return 'marketing:share';
      case 'Web Based Video or Streaming':
        return 'marketing:resources';
      default:
        return "";
    }
  }

  updateTemplate(): void {
    const selectedApprovedFors = [];
    if( this.isPrint ) selectedApprovedFors.push("Print");
    if( this.isSocialMedia ) selectedApprovedFors.push("Social Media");
    if( this.isWebVideo ) selectedApprovedFors.push("Web Based Video or Streaming");

    const templateIds = [];
    let filteredApprovedFors = [];
    for( var i = 0; i < this.templates.length; i++ ) {
      templateIds.push(this.templates[i].id);

      let templateApprovedFors = this.templates[i].template_approved_fors.map(fors => fors.name);

      filteredApprovedFors = selectedApprovedFors
      ?.filter(name => !templateApprovedFors.includes(name));
    }

    
  }


}

