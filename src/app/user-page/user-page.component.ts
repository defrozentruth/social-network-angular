import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../service/user.service";
import {AuthService} from "../service/auth.service";
import {Socket} from "ngx-socket-io";
import {ImageService} from "../service/image.service";
import Image from "../model/image";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit{
  user: any;
  news: any;
  image: Image | undefined;
  private id: number | undefined;
  @ViewChild('fileInput') fileInput!: ElementRef;
  constructor(
    private route: ActivatedRoute,
    public userService: UserService,
    public imageService: ImageService,
    private socket: Socket
  ) {}

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.id = parseInt(params.get('id')!)
    })

    this.userService.getUserById(this.id!).subscribe(user => this.user = user)
    this.userService.getUserNews(this.id!).subscribe(news => this.news = news)
    this.userService.getUserImage(this.id!).subscribe(image => this.image = image as Image)

    this.getNewsStream().subscribe({
      next: news => this.userService.getUserNews(this.id!).subscribe(news => this.news = news),
      error: console.error
    })

    this.watchPhotoChanges().subscribe({
      next: image => this.userService.getUserImage(this.id!).subscribe(image => this.image = image as Image),
      error: console.error
    })
  }

  editImage(){
    this.imageService.editPhoto(this.fileInput)
  }

  getNewsStream = () => {
    return this.socket.fromEvent('feed')
  }

  watchPhotoChanges = () => {
    return this.socket.fromEvent('image');
  }

  protected readonly AuthService = AuthService;
}
