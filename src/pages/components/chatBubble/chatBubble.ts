import {Component} from '@angular/core';

@Component({
  selector: 'chat-bubble',
  inputs: ['msg: message'],
  templateUrl: 'chatBubble.html'
})
export class ChatBubble {
  msg : any;
  
  constructor() {
    this.msg = {
      content :  'Am I dreaming?',
      position : 'left',
      img: '',
      picture: '',
      article: '',
      name: ''
    }
  }
}
//    <a *ngIf="msg.article" ion-item href="{{msg.article}}" (click)='window.open(this.href, "_system", "location=yes"); return false;'>{{msg.name}}</a>