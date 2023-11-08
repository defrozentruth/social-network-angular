import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {ActivatedRoute} from "@angular/router";
import {Socket} from "ngx-socket-io";
import {MessageService} from "../service/message.service";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit{
  chats: any;
  constructor(
    public userService: UserService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private socket: Socket
  ) {}

  ngOnInit() {
    this.getChats();
    this.getMessageStream().subscribe({
      next: message => { this.getChats() },
      error: console.error
    })
  }

  getChats = () => {
    let users: any[];
    this.userService.getUsers().subscribe({
      next: (chats) => { users = chats as any[] },
      error: console.error
    })


    this.messageService.getChats().subscribe({
      next: chats => {
        this.chats = users.filter(value => (<number[]>chats).includes(value.id))
      },
      error: console.error
    })
  }

  private getMessageStream = () => {
    return this.socket.fromEvent('message')
  }
  protected readonly AuthService = AuthService;
}
