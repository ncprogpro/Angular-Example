import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogData } from '@core/models/IdialogData';
import { DialogService } from '@core/services/dialog.service';
// import { MarketingService } from '@core/services/marketing.service';
// import { MediaManagerComponent } from '@shared/common-sidebars/media-manager/media-manager.component';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { GlobalConstants } from '@core/data/globals-constants';
// import {AWS_URL, AwsService, BUCKET_NAME, BUCKET_PREFIX, BUCKET_PREFIX2, BUCKET_PREFIX_TEMPLATE_ATTACHMENTS} from '@core/services/aws.service';
import { environment } from '@env';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-edit-template-sidebar',
  templateUrl: './edit-template-sidebar.component.html',
  styleUrls: ['./edit-template-sidebar.component.scss']
})
export class EditTemplateSidebarComponent implements OnInit {

  editForm: FormGroup;
  template: any;
  isTemplateNameDuplicated: boolean;
  submitting: boolean;
  tabIndex = 0;
  allMarketingCategories: any = [];
  templateJobID: any;
  templateParentJobID: any;
  templateMarketingCategoryID: any;
  marketingCategories: any = [];
  templateParentJobs: any = [];
  templateJobs: any = [];
  isCategorySelected = true;

  newThumbnailImg = '';
  newAttachment = '';
  attachmentFileName = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IDialogData,
    public dialogRef: MatDialogRef<EditTemplateSidebarComponent>,
    private fb: FormBuilder,
    private dialogServ: DialogService,
    public dialog: NgDialogAnimationService,
  ) { }

  ngOnInit(): void {
    this.template = this.data.data.template;
    this.allMarketingCategories = this.data.data.allMarketingCategories;
    this.templateJobID = this.template.job?.id;
    this.templateParentJobID = this.template.job?.parent_job_id;
    this.templateMarketingCategoryID = this.template.job?.marketing_category;
    this.getCategoryPath();

    this.attachmentFileName = this.template.email_attachment && this.template.email_attachment.name;

    this.editForm = this.fb.group(Object.assign({
      templateName: [
        this.template.main_name,
        [Validators.required, this.checkTemplateName()]
      ],
      description: [
        this.template.description
      ]
    }) );


  }

  checkTemplateName(): any {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return !this.isTemplateNameDuplicated ? null : {isTemplateNameDuplicated: true};
    };
  }

  getCategoryPath() {
    if( this.template.job ) {
      if( this.templateParentJobID ) {
        for( var i = 0; i < this.allMarketingCategories.length; i++ ) {
          if( this.templateMarketingCategoryID == this.allMarketingCategories[i].id ) {
            this.templateParentJobs = this.allMarketingCategories[i]?.jobs;
          }
        }

        for( var i = 0; i < this.templateParentJobs.length; i++ ) {
          if( this.templateParentJobID == this.templateParentJobs[i].id )
            this.templateJobs = this.templateParentJobs[i]?.child_jobs;
        }
      } else {
        this.templateParentJobID = this.templateJobID;
        for( var i = 0; i < this.allMarketingCategories.length; i++ ) {
          if( this.templateMarketingCategoryID == this.allMarketingCategories[i].id ) {
            this.templateParentJobs = this.allMarketingCategories[i]?.jobs;
          }
        }
      }

    }
  }

  onChangeMarketingCategories(event) {
    this.templateMarketingCategoryID = event.target.value;
    this.templateParentJobID = null;
    this.templateJobID = null;
    this.templateJobs = [];

    for( var i = 0; i < this.allMarketingCategories.length; i++ ) {
      if( this.templateMarketingCategoryID == this.allMarketingCategories[i].id ) {
        this.templateParentJobs = this.allMarketingCategories[i]?.jobs;
      }
    }

    this.submitting = false;
    this.isCategorySelected = true;
  }

  onChangeTemplateParentJobs(event) {
    this.templateParentJobID = event.target.value;
    this.templateJobID = null;
    this.templateJobs = [];

    for( var i = 0; i < this.templateParentJobs.length; i++ ) {
      if( this.templateParentJobID == this.templateParentJobs[i].id )
        this.templateJobs = this.templateParentJobs[i]?.child_jobs;
    }

    this.submitting = false;
    this.isCategorySelected = true;
  }

  onChangeTemplateJobs(event) {
    this.templateJobID = event.target.value;
    this.submitting = false;
    this.isCategorySelected = true;
  }

  onSubmit() {
    this.submitting = true;
    let jobID = this.templateJobID;
    if( this.templateJobs.length == 0 )
      jobID = this.templateParentJobID;

    if( !this.templateParentJobID || ( this.templateJobs.length > 0 && !this.templateJobID ) ) {
      this.isCategorySelected = false;
    }

    if( this.editForm.valid && this.isCategorySelected ) {
      
    }
  }

  inputChange(): void {
    this.submitting = false;
  }

  toggleMediaManager(): void {
    this.tabIndex = 0;
  }

  onCode(image: string): void {

    this.tabIndex = 0;
  }

  toggleMediaManager_2(): void {
    this.tabIndex = 0;
  }

  onCode_2(media: string): void {
    this.attachmentFileName = this.getFileName( media );

    this.tabIndex = 0;
  }

  getFileName(filePath: string) {
    const array = filePath.split("/");

    return array[ array.length - 1 ];
  }

  resolveImgUrl(source, path_prefix = '') {
    if(!source)
      return "";
    if(source.startsWith('https://') || source.startsWith('http://'))
      return source;
    return path_prefix + source;
  }

  getThumbnailUrl(img, hThumb = 200, force = false) {
    if(!img)
      return "";
    if(!force && (img.startsWith('https://') || img.startsWith('http://')))
      return img;

    return `${environment.apiUrl}/thumb/h${hThumb}/${img}`;
  }

}
