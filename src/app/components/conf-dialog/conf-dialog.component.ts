import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-conf-dialog',
  imports: [MatDialogModule,MatDialogModule, MatButtonModule,MatFormFieldModule],
  templateUrl: './conf-dialog.component.html',
  styleUrl: './conf-dialog.component.css',
})
export class ConfDialogComponent {


  dialogRef = inject(MatDialogRef<ConfDialogComponent>);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
  
  handleConfirm(){
    this.dialogRef.close({result:true});
  }

  handleCancel()
  {
    this.dialogRef.close({result:false});
  }
}
