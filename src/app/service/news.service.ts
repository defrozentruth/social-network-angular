import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "./user.service";
import MessageData from "../model/message";
import NewsData from "../model/news";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(private http: HttpClient, private userService: UserService) { }

  public sendNews = (news: Partial<NewsData>) => {
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    })
    news.author_name = this.userService.user.name
    news.author_id = this.userService.user.id
    return this.http.post(`api/news/`, JSON.stringify(news), {headers: headers})
  }

}
