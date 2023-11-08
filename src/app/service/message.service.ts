import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "./user.service";
import MessageData from "../model/message";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient, private userService: UserService) { }

  public getChats = () => {
    return this.http.get(`api/message/${this.userService.user.id}`)
  }

  public getMessages = (id: number) => {
    return this.http.get(`api/message/${this.userService.user.id}/${id}`)
  }

  public sendMessage = (message: Partial<MessageData>) => {
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    })
    message.sender_name = this.userService.user.name
    message.sender_id = this.userService.user.id
    return this.http.post(`api/message/${this.userService.user.id}/${message.receiver_id}`, JSON.stringify(message), {headers: headers})
  }
}
