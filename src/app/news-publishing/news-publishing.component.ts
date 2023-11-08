import {Component} from '@angular/core';
import {UserService} from "../service/user.service";
import NewsData from "../model/news";
import {NewsService} from "../service/news.service";

@Component({
  selector: 'app-news-publishing',
  templateUrl: './news-publishing.component.html',
  styleUrls: ['./news-publishing.component.css']
})
export class NewsPublishingComponent {
  newsText: string = '';

  constructor(
    private newsService: NewsService,
    private userService: UserService,
  ) { }

  sendNews() {
    if (this.newsText.trim() !== '') {

      const message: Partial<NewsData> = {
        author_id: this.userService.user.id,
        content: this.newsText,
        date: new Date()
      }

      this.newsService.sendNews(message).subscribe({
        complete: () => console.log('Новость опубликована:', this.newsText),
        error: console.error
      })
      this.newsText = ''; // Очистка поля ввода
    }
  }
}

