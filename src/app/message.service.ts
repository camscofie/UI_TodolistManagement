import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

  logMessage(message: string) {
    //Maybe log requests in future
    console.log(message);
  }

  clear() {
    this.messages = [];
  }

  addError(message: string) {
    this.messages.push(message);
  }
}
