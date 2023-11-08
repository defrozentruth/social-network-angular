import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MessageService} from "../service/message.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../service/user.service";
import {Socket} from "ngx-socket-io";
import {AuthService} from "../service/auth.service";
import {UserCardComponent} from "../user-card/user-card.component";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  friendId: number | undefined;
  messages: any;
  friendName: string | undefined;
  @ViewChild('user-chat-container') userChatContainer: ElementRef | undefined;
  private dialog: any;
  constructor(
    private messageService: MessageService,
    public userService: UserService,
    private route: ActivatedRoute,
    private socket: Socket
  ) {}

  ngOnInit() {
    this.loadMessages()
    this.getMessageStream().subscribe({
      next: news => { this.loadMessages() },
      error: console.error
    })
  }

  private loadMessages = () => {
    this.route.paramMap.subscribe({
      next: params => this.friendId = parseInt(params.get('id')!),
      error: console.error
    })
    this.messageService.getMessages(this.friendId!).subscribe({
      next: messages => this.messages = messages,
      error: console.error
    })

    this.userService.getUserById(this.friendId!).subscribe({
      next: user => this.friendName = (<any>user).name,
      error: console.error
    })
  }

  private getMessageStream = () => {
    return this.socket.fromEvent('message')
  }
  protected readonly AuthService = AuthService;

  openUserCardsDialog() {
    const dialogRef = this.dialog.open(UserCardComponent, {
      width: '400px', // Задайте ширину окна по вашему усмотрению
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Диалог был закрыт, результат: ${result}`);
    });
  }
}
