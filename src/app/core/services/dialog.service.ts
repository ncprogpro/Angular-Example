import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { DialogComponent } from '@shared/dialog/dialog.component';
import { DialogOption } from '@core/models/dialogOption';
import { DialogOptionTypeEnum } from '@core/models/dialogOptionTypeEnum';

@Injectable({
    providedIn: 'root'
  })

export class DialogService {
  constructor(
    private dialog: MatDialog
    ) { }
  dialogRef: MatDialogRef<DialogComponent>;

  public showSideAlert(options) {
    this.dialogRef = this.dialog.open(DialogComponent, {
         data: {
           title: options.title,
           message: options.message,
           message2: options.message2,
           cancelText: options.cancelText,
           confirmText: options.confirmText,
         },
         width: '300px',
         maxWidth:'100vh',
         height: '100%',
         position: {top: '10px', right:'10px'}
    });

  }

  showAlert(dialogData: DialogOption, extraStyle = {}): Observable<boolean> {
    dialogData.type = DialogOptionTypeEnum.alert;
    let alertDialog = this.dialog.open(DialogComponent, {
      data: dialogData,
      width: "auto",
      height: "auto",
      ...extraStyle
    });

    return alertDialog.afterClosed();
  }

  showWarning(message: string, confirm: string = 'OK', content: string = '',cancel: string = "Cancel"): Observable<boolean> {
    let dialogOption: DialogOption = new DialogOption(
      content ? message : null,
      content ? content : message,
      null,
      confirm,
      cancel
    )
    dialogOption.type = DialogOptionTypeEnum.warning;
    let warning = this.dialog.open(DialogComponent, {
      data: dialogOption,
      width: 'auto',
      height: 'auto',
      position: {left: '45%'}
    });

    return warning.afterClosed();
  }

  public confirmed(): Observable<any> {

    return this.dialogRef.afterClosed().pipe(take(1), map(res => {
        return res;
      }
    ));
  }
}
