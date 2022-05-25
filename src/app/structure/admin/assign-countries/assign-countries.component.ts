import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { IDialogData } from '@core/models/IdialogData';
import { SelectionModel } from '@angular/cdk/collections';
import { AlertService } from '@core/services/alert.service';
import { CountryCode, CountryCodes} from '@core/data/countries';


@Component({
  selector: 'app-assign-countries',
  templateUrl: './assign-countries.component.html',
  styleUrls: ['./assign-countries.component.scss']
})
export class AssignCountriesComponent {

  selection = new SelectionModel(true, []);
  templateApprovedFors: any;
  approvedForsNames = ["Print", "Social Media", "Web Based Video or Streaming"];
  isPrint = false;
  isSocialMedia = false;
  isWebVideo = false;
  templates: any;
  isCountries: boolean[] = [];
  countryCodes: Array<CountryCode> = CountryCodes;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: IDialogData,
    public dialogRef: MatDialogRef<AssignCountriesComponent>,
    private alertService: AlertService
  ) {
    this.templates = data;

    for( var i = 0; i < this.countryCodes.length; i++ ) {
      this.isCountries[i] = false;
    }
  }

  close() {
    this.selection = new SelectionModel(true, []);
    this.dialogRef.close();
  }

  updateTemplate(): void {
    const selectedCountries = [];
    for( var i = 0; i < this.countryCodes.length; i++ ) {
      if( this.isCountries[i] ) {
        selectedCountries.push( this.countryCodes[i].name );
      }
    }

    let filteredCountries = [];
    for( var i = 0; i < this.templates.length; i++ ) {
      let templateCountries = this.templates[i].template_countries.map(country => country.name);

      filteredCountries = selectedCountries?.filter(name => !templateCountries.includes(name));
    }

    
  }

}
