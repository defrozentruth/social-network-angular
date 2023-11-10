import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {Socket} from "ngx-socket-io";
import {CompleteUser} from "../model/user";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any;

  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private socket: Socket,
  ) {}

  ngOnInit() {
    this.route.url.subscribe(segments => {
      const url = segments.map(segment => segment.path).join('/');

      if (url.startsWith('friends/')) {
        this.route.paramMap.subscribe(params => {
          const id = parseInt(params.get('id')!, 10);
          this.loadFriends(id);
          this.subscribeToUsersStream(id);
        });
      } else if (url.startsWith('users')) {
        this.loadUsers();
        this.subscribeToUsersStream();
      }
    });
  }

  private loadFriends(id: number) {
    this.userService.getFriends(id).subscribe({
      next: this.usersHandler,
      error: console.error
    });
  }

  private loadUsers() {
    this.userService.getUsers().subscribe({
      next: this.usersHandler,
      error: console.error
    });
  }

  private subscribeToUsersStream(id?: number) {
    this.getUsersStream().subscribe({
      next: () => {
        if (id) {
          this.loadFriends(id);
        } else {
          this.loadUsers();
        }
      },
      error: console.error
    });
  }

  private getUsersStream() {
    return this.socket.fromEvent('friend');
  }

  private usersHandler = async (users: any) => {
    try {
      const imagePromises = users.map(async (value: any) => {
        try {
          const image: any = await this.userService.getUserImage(value.id).toPromise();
          value['image'] = image.image_url;
        } catch (error) {
          console.error(error);
        }
      });

      await Promise.all(imagePromises);
      this.users = users;
    } catch (error) {
      console.error(error);
    }
  };

  protected readonly AuthService = AuthService;
}
