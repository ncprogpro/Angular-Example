import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { GetSetDataService } from './core/services/getsetdata.service';
import { DialogService } from '@core/services/dialog.service';
import { AlertService } from '@core/services/alert.service';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { GlobalConstants } from '@core/data/globals-constants';
import { EditTemplateSidebarComponent } from './structure/admin/edit-template-sidebar/edit-template-sidebar.component';
import { Template } from '@core/models/template';
import { SelectionModel } from '@angular/cdk/collections';
import { DeleteTemplateComponent } from './structure/admin/delete-template/delete-template.component';
import { ApproveTemplateComponent } from './structure/admin/approve-template/approve-template.component';
import { AssignCountriesComponent } from './structure/admin/assign-countries/assign-countries.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryManagerSidebarComponent } from './structure/admin/category-manager-sidebar/category-manager-sidebar.component';
import { IconService } from './core/services/icon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'select',
    'thumbnail',
    'main_name',
    'template_type',
    'job',
    'email_attachment',
    'description',
    'action'
  ];
  @ViewChild(MatTable) templatesTable: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: MatTableDataSource<any>;
  templates: any = [];
  resultsLength = 0;
  pageSize: number = 5;
  pageIndex: number = 0;
  selection = new SelectionModel<Template>(true, []);
  sidebarDefaultConfig = GlobalConstants.sidebarDefaultConfig;
  queryparams: any = [];
  categories: any = {};
  allMarketingCategories: any = [];
  isCategoriesLoaded = false;

  constructor(
    private getSetDataService: GetSetDataService,
    private dialogServ: DialogService,
    private alertService: AlertService,
    public dialog: NgDialogAnimationService,
    private route: ActivatedRoute,
    private router: Router,
    private readonly iconService: IconService
  ) {
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = [];
    this.handlePaginatorInfo();
    
    // add our svg icons into the material icon registry
    this.iconService.init();
  }

  handlePaginatorInfo(): void {
    let pageSize = localStorage.getItem("adminTemplatePageSize");
    let pageIndex = localStorage.getItem("adminTemplatePageIndex");
    let paginatorData = this.getSetDataService.getOption(this.getSetDataService.adminTemplatePaginatorDataString);
    if(paginatorData === undefined) {
      this.pageSize = pageSize ? Number(pageSize) : this.pageSize;
      this.pageIndex = pageIndex ? Number(pageIndex) : this.pageIndex;
      this.getSetDataService.setOption(this.getSetDataService.adminTemplatePaginatorDataString, this.paginator);
    } else {
      this.paginator = paginatorData;
      this.pageSize = pageSize ? Number(pageSize) : this.paginator.pageIndex;
      this.pageIndex = pageIndex ? Number(pageIndex) : this.paginator.pageSize;
    }
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = [];
  }

  ngOnInit(): void {
    this.getMarketingCategories();
    this.getTemplates();
  }

  ngAfterViewInit(): void {
    this.getMarketingCategories();
    this.getTemplates();
  }

  getMarketingCategories(): void {
  }



  getTemplates(): void {
    
    this.dataSource.data = [
      {	thumbnail: 1, main_name: 'User 1',	template_type: 2, job: 'Custom', email_attachment: 'EA', description: 'Description 1' },
      {	thumbnail: 2, main_name: 'User 2',	template_type: 2, job: 'Custom', email_attachment: 'EA', description: 'Description 2' },
      {	thumbnail: 3, main_name: 'User 3',	template_type: 2, job: 'Custom', email_attachment: 'EA', description: 'Description 3' },
      {	thumbnail: 4, main_name: 'User 4',	template_type: 2, job: 'Custom', email_attachment: 'EA', description: 'Description 4' },
      {	thumbnail: 5, main_name: 'User 5',	template_type: 2, job: 'Custom', email_attachment: 'EA', description: 'Description 5' },
      {	thumbnail: 6, main_name: 'User 6',	template_type: 2, job: 'Custom', email_attachment: 'EA', description: 'Description 6' },
      {	thumbnail: 7, main_name: 'User 7',	template_type: 2, job: 'Custom', email_attachment: 'EA', description: 'Description 7' },
      {	thumbnail: 8, main_name: 'User 8',	template_type: 2, job: 'Custom', email_attachment: 'EA', description: 'Description 8' },
      {	thumbnail: 9, main_name: 'User 9',	template_type: 2, job: 'Custom', email_attachment: 'EA', description: 'Description 9' },
      {	thumbnail: 10, main_name: 'User 10',	template_type: 2, job: 'Custom', email_attachment: 'EA', description: 'Description 10' },
    ];
    this.resultsLength = this.dataSource.data ? this.dataSource.data.length : 0;
    this.dataSource.paginator = this.paginator;
    this.selection = new SelectionModel<Template>(true, []);
  }

  pageNavigations(event): void {
    console.log("event = ", event);
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    localStorage.setItem("adminTemplatePageSize", this.pageSize.toString());
    localStorage.setItem("adminTemplatePageIndex", this.pageIndex.toString());
    this.getSetDataService.removeOption(this.getSetDataService.adminTemplatePaginatorDataString);
    this.getSetDataService.setOption(this.getSetDataService.adminTemplatePaginatorDataString, this.paginator);
  }

  deleteTemplate(id): void {
    this.dialogServ.showWarning(`Are you sure you want to delete this user?`, 'Yes')
      .subscribe(response => {
        if (response) {}
      });
  }

  onClickEditTemplate(template): void {
    this.dialog.open(
      EditTemplateSidebarComponent,
      {
        ...GlobalConstants.sidebarDefaultConfig,
        data: {
          data: {
            template: template,
            allMarketingCategories: this.allMarketingCategories,
          }
        }
      }
    );

  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length ? this.selection.selected.length : 0;
    const numRows = this.dataSource.data ? this.dataSource.data.length : 0;
    return numSelected === numRows;
  }

  checkboxLabel(row?: Template): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }

  masterToggle(): void {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  bulkDelete(): void {
    if (this.selection.selected.length) {

      this.sidebarDefaultConfig.data = this.selection.selected;
      const dialogRef = this.dialog.open(DeleteTemplateComponent,
        this.sidebarDefaultConfig
      );
      dialogRef.afterClosed().subscribe((result) => {
        this.getTemplates();
      });
    }

  }

  bulkApproveTemplate(): void {
    if (this.selection.selected.length) {

      this.sidebarDefaultConfig.data = this.selection.selected;
      const dialogRef = this.dialog.open(ApproveTemplateComponent,
        this.sidebarDefaultConfig
      );
      dialogRef.afterClosed().subscribe((result) => {
        this.getTemplates();
      });
    }

  }

  assignCountries(): void {
    if (this.selection.selected.length) {

      this.sidebarDefaultConfig.data = this.selection.selected;
      const dialogRef = this.dialog.open(AssignCountriesComponent,
        this.sidebarDefaultConfig
      );
      dialogRef.afterClosed().subscribe((result) => {
        this.getTemplates();
      });
    }

  }

  handleSortForTableField(sortEvent: any): void {
    let sortValue: string;
    sortValue =
      sortEvent.direction === 'asc' ? sortEvent.active : '-' + sortEvent.active;
    this.queryparams['sort'] = sortValue;
    this.getTemplates();
  }

  onClickCategory(): void {
    this.dialog.open(CategoryManagerSidebarComponent, {
      ...GlobalConstants.sidebarDefaultConfig,
      width: '500px'
    });
  }

  onClickViewTemplate(template) {
    const url = this.router.serializeUrl(this.router.createUrlTree([ '/marketing/template'],
      {
        queryParams: {
          set_id: template.set_id
        },
      })
    );

    window.open(url, '_blank');
  }
}

