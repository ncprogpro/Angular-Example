import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  HostListener,
  Inject,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      cancelText: string;
      confirmText: string;
      message: string;
      message2: string;
      title: string;
      type: boolean;
    },
    private mdDialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void{

  }

  cancel() {
    this.mdDialogRef.close(false);
  }

  confirm() {
    this.mdDialogRef.close(true);
  }

  @HostListener('keydown.esc')
  public onEsc() {
    this.mdDialogRef.close(false);
  }

  // public cancel() {
  //   this.close(false);
  // }
  // public close(value) {
  //   this.mdDialogRef.close(value);
  // }
  // public confirm() {
  //   this.close(true);
  // }
}
