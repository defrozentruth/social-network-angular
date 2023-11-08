import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../service/user.service";
import {AuthService} from "../service/auth.service";
import {NewsService} from "../service/news.service";
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit{
  user: any;
  news: any;
  private id: number | undefined;
  constructor(
    private route: ActivatedRoute,
    public userService: UserService,
    private socket: Socket
  ) {}

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.id = parseInt(params.get('id')!)
    })

    this.userService.getUserById(this.id!).subscribe(user => this.user = user)
    this.userService.getUserNews(this.id!).subscribe(news => this.news = news)

    this.getNewsStream().subscribe({
      next: news => this.userService.getUserNews(this.id!).subscribe(news => this.news = news),
      error: console.error
    })
  }

  getNewsStream = () => {
    return this.socket.fromEvent('feed')
  }

  protected readonly AuthService = AuthService;
}
