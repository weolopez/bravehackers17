import { Component, ChangeDetectorRef  } from '@angular/core';
import { ApiaiService } from '../../app/services/apiai.service';
//import { TdatasalesService } from '../../app/services/tdatasales.service';
//import { TdataserviceService } from '../../app/services/tdataservice.service';
//import { HelpcenterService } from '../../app/services/helpcenter.service';
import { ChatBubble } from '../components/chatBubble/chatBubble';
import { NavController, Platform } from 'ionic-angular';

//declare var SpeechRecognition: any;
//declare var platform: any;
declare var webkitSpeechRecognition: any;

@Component({
  selector: 'mrtdata',
  templateUrl: 'mrtdata.html',
})
export class MrtdataPage {
  messages: any;
  chatBox: String;
  recognition: any;
  buttonLabel: String;
  buttonColor: String;
  myMap: any;

  constructor(public navCtrl: NavController, public platform: Platform, private apiaiService:ApiaiService, private cdRef:ChangeDetectorRef)
{
     this.messages = [];
     this.chatBox = '';
     this.buttonLabel = 'START TALKING';
     this.buttonColor = 'secondary';
     this.myMap = new Map();
  }


  startRecognition() {
      this.platform.ready().then(() => {

         this.recognition = new webkitSpeechRecognition();
         //this.recognition = new SpeechRecognition();
         this.recognition.lang = 'en-US';
         this.recognition.onnomatch = (event => {
            //this.showAlert('No match found.');
         });
         this.recognition.onerror = (event => {
            //this.showAlert('Error happens.');
         });
         this.recognition.onresult = (event => {
            if (event.results.length > 0) {
                  console.log('Output STT: ', event.results[0][0].transcript);            
               this.loadWords(event.results[0][0].transcript);
            }
           // this.stopRecognition();
         });
         this.recognition.start();
      });
   }

   loadWords(dati: string) {
      this.ask(dati);
   }

  switchRecognition() {
     if (this.recognition) {
         this.buttonLabel = 'START TALKING';
        this.buttonColor = 'secondary';
         this.stopRecognition();
     } else {
        this.buttonLabel = 'STOP TALKING';
         this.buttonColor = 'danger';
        this.startRecognition();
     }
  }

  stopRecognition() {
      if (this.recognition) {
        this.recognition.stop();
        this.recognition = null;
      }
  }

  ngOnInit() {
      console.log("OnInit Ran...");
      //load Map
      this.loadMap();
  }

  ask(text: any) {
      var sendmsg = {
         content : text,
         position : 'left',
         picture: '../../assets/img/me.JPG',
         img: '',
         article: '',
         name: ''
      }
      this.messages.push(sendmsg)
      this.apiaiService.send(text).subscribe(response => {
         var getmsg = {
             content : response.result.speech,
             position : 'right',
             picture: '../../assets/img/usher2.png',
             img: '',
             article: '',
             name: ''
         }
         console.log(response);
         if (response.result.action == 'show-trailer') {
            // show trailer
            this.messages.push(getmsg); 
            this.cdRef.detectChanges();
         }
         else if (response.result.action == 'show-review' ) {
            // show review
            this.messages.push(getmsg); 
            this.cdRef.detectChanges();
         }
         else if (response.result.action == 'show-tickets') {
            //show tickets
            this.messages.push(getmsg); 
            this.cdRef.detectChanges();
         }        
         else {
             this.messages.push(getmsg); 
             this.cdRef.detectChanges();
         }
      });    
      this.chatBox = "";
  }

  

    loadMap(){
     //   this.myMap.set('Topic261','Billing - Want to pay bill');
   

    }

}