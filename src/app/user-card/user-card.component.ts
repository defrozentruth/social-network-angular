import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {UserCardsDialogComponent} from "../user-cards-dialog/user-cards-dialog.component";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() user: any;

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<UserCardsDialogComponent>
  ) {}
  onSubmit(){
    this.router.navigate(['chat', this.user.id])
    this.dialogRef.close()
  }
}
