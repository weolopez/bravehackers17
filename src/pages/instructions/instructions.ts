import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NavController, ViewController, Platform, Slides, ModalController, Modal } from 'ionic-angular';

@Component({
  selector: 'page-instructions',
  templateUrl: 'instructions.html'
})

export class InstructionsPage {

  @ViewChild('slides') slides: Slides;
  @ViewChild('slidesWrapper') slidesWrapper: ElementRef;

  private unregisterKeyboardListener;

  private intents: any;
  public listeningText: string;

  constructor (
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public platform: Platform,
    private element: ElementRef,
    private changeDetector: ChangeDetectorRef,
    private modalController: ModalController
  ) {
        this.intents = new Map();
  }

  ngOnInit() {
    // Make the modal full screen
    this.element.nativeElement.parentNode.classList.add("full-screen");
  }

  ionViewDidEnter() {
    this.startListeningToKeyboard();
  }

  ionViewDidLeave() {
    this.stopListeningToKeyboard();
  }

  startListeningToKeyboard() {
    this.stopListeningToKeyboard();
    this.unregisterKeyboardListener = this.platform.registerListener(this.platform.doc(), 'keydown', (event) => this.handleKeyboardEvents(event), {});
  }

  stopListeningToKeyboard() {
    if (this.unregisterKeyboardListener) {
      this.unregisterKeyboardListener();
    }
  }

  handleKeyboardEvents(event) {
    switch (event.key) {
      case "ArrowDown":
      this.viewCtrl.dismiss();
      break;

      default:
      break;
    }
  }

  tryToDetectChanges() {
    try {
      this.changeDetector.detectChanges();
    } catch (error) {
      console.log(error);
    }
  }

}
