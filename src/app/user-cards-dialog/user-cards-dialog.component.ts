import {AfterContentInit, Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../service/user.service";
import {CompleteUser} from "../model/user";

@Component({
  selector: 'app-user-cards-dialog',
  templateUrl: './user-cards-dialog.component.html',
  styleUrls: ['./user-cards-dialog.component.css']
})
export class UserCardsDialogComponent implements OnInit {
  public users: CompleteUser[] | undefined; // Здесь храните список пользователей

  constructor(
    public dialogRef: MatDialogRef<UserCardsDialogComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: CompleteUser[]
  ) {}

  async ngOnInit() {
    this.getAvailableUsers().subscribe({
    next: users => this.users = ((users! as CompleteUser[]).filter(
      (user: CompleteUser) => {
        return !this.data.some((dataItem: any) => dataItem.id === user.id || user.id === this.userService.user.id);
      })
    ),
    error: console.error
    })
  }

  getAvailableUsers(){
    return this.userService.getUsers()
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
