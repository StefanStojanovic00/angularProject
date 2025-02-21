import { Component,  } from '@angular/core';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { inject } from '@angular/core';
import { ListCategoryComponent } from '../list-category/list-category.component';
import { MatFormFieldModule } from '@angular/material/form-field';



@Component({
  selector: 'app-admin-panel',
  imports: [MatFormFieldModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css',
})
export class AdminPanelComponent {

  dialog= inject(MatDialog);
  openCategoryEditor() {
    this.dialog.open(ListCategoryComponent,{width:'auto',height:'auto'});
    
  }



}
