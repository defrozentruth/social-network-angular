import {Component, Input} from '@angular/core';
import {MessageService} from "../service/message.service";
import MessageData from "../model/message";

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css']
})
export class MessageInputComponent {
  @Input()friendId: any
  messageText: string = '';

  constructor(
    private messageService: MessageService
  ) { }

  sendMessage() {
    if (this.messageText.trim() !== '') {

      const message: Partial<MessageData> = {
        receiver_id: this.friendId,
        text: this.messageText,
        timestamp: new Date()
      }

      this.messageService.sendMessage(message).subscribe({
        complete: () => console.log('Отправлено сообщение:', this.messageText),
        error: console.error
      })
      this.messageText = ''; // Очистка поля ввода

    }
  }
}
