import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { BaseDialog } from '../../base/base-dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrl: './update-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateDialogComponent extends BaseDialog<UpdateDialogComponent> {

  constructor(
    dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
  }
}
export enum AcceptState {
  Yes,
  No
}