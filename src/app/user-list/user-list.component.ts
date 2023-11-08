import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{
  users: any;
  constructor(
    public userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let url;
    this.route.url.subscribe(segments =>{
      url = segments.map(segment => segment.path).join('/')
    })
    if(url!.startsWith('friends/')){
      this.route.paramMap.subscribe(params => {
        this.loadFriends(parseInt(params.get('id')!))
      })
    } else if(url!.startsWith('users')){
      this.loadUsers()
    }
  }

  private loadFriends(id: number){
    this.userService.getFriends(id).subscribe({
      next: users => this.users = users,
      error: console.error
    })
  }

  private loadUsers(){
    this.userService.getUsers().subscribe({
      next: users => this.users = users,
      error: console.error
    })
  }

  protected readonly AuthService = AuthService;
}
