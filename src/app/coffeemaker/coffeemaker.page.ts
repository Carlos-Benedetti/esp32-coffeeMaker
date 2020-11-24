import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, IonDatetime } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-coffeemaker',
  templateUrl: './coffeemaker.page.html',
  styleUrls: ['./coffeemaker.page.scss'],
})
export class CoffeemakerPage implements OnInit {
  @ViewChild('executionTime', { static: false }) executionTime: IonDatetime
  public timerpassed: number
  public done = false
  public coffeeIntent: CoffeeIntent;
  constructor(public actionSheetController: ActionSheetController) { }

  ngOnInit() {
  }
  async forceActionSheet(){
    const actionSheet = await this.actionSheetController.create({
      header: 'Forçar Ação',
      buttons: [{
        text: 'Parar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        icon: 'caret-forward-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  startCoffee() {
    const executionTimerTime = new Date(this.executionTime.value)
    const endTime = moment()

    endTime.add(executionTimerTime.getMinutes(), 'minutes')
    endTime.add(executionTimerTime.getSeconds(), 'seconds')

    console.log(moment().diff(endTime))
    this.coffeeIntent = new CoffeeIntent(moment(), endTime)
  }
  endCoffee() {
    if (this.coffeeIntent) {
      this.coffeeIntent.done = true
    }
  }
}
export class CoffeeIntent {
  private _done = false;
  public get done() {
    return this._done;
  }
  public set done(value) {
    this._done = value;
    if (this._done && this.timer) {
      console.log("cleaning interval")
      clearInterval(this.timer)
    }
  }
  public timerpassed = 0
  timer: any;
  constructor(public startTime: moment.Moment, public endTime: moment.Moment) {
    this.timer = setInterval(() => this.calculateTimer(), 1000)
  }

  calculateTimer() {
    this.timerpassed = (moment().unix() - this.startTime.unix()) / (this.endTime.unix() - this.startTime.unix())
    if (this.timerpassed >= 1) {
      this.done = true
    }
  }
}
