import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { of, throwError } from 'rxjs';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { CoffeeMaker } from './coffee-maker';

@Injectable({
  providedIn: 'root'
})
export class CoffeeMakerService {

  constructor(private http: HttpClient, public toastController: ToastController) {

  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Falha ao se comunicar com a Cafeteira',
      duration: 2000
    });
    toast.present();
  }

  on(cooffeeMaker: CoffeeMaker) {
    return this.http.get(`${cooffeeMaker.ip}/on`, { observe: 'response' }).pipe(
      catchError(error => { this.presentToast(); return throwError(error) })
    )
  }
  off(cooffeeMaker: CoffeeMaker) {
    return this.http.get(`${cooffeeMaker.ip}/off`)
  }
}
