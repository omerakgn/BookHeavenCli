import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteDialogComponent extends BaseDialog<DeleteDialogComponent> {
 
  constructor(
    dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteState,
  ) {
    super(dialogRef);
  }
}

export enum DeleteState {
  Yes,
  No
}