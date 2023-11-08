import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {ActivatedRoute} from "@angular/router";
import {Socket} from "ngx-socket-io";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit{
  news: any;
  constructor(
    public userService: UserService,
    private socket: Socket
  ) {}

  ngOnInit() {
    this.getNewsFeed()
    this.getNewsStream().subscribe({
      next: news => { this.getNewsFeed() },
      error: console.error
    })
  }

  getNewsFeed = () => {
    this.userService.getUserFeed().subscribe({
      next: news => this.news = news,
      error: console.error
    })
  }

  getNewsStream = () => {
    return this.socket.fromEvent('feed')
  }
  protected readonly AuthService = AuthService;
}
