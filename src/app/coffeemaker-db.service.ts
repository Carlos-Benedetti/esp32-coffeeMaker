import { Injectable } from '@angular/core';
import firebase from 'firebase'
import { CoffeeMaker } from './coffee-maker';
@Injectable({
  providedIn: 'root'
})
export class CoffeemakerDBService {
  public coffeeMakers: CoffeeMaker[] = []
  public user?: firebase.User
  public dbRef?: firebase.database.Reference

  init() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user
      this.dbRef = firebase.database().ref('coffeeMakers/' + user.uid)
      this.dbRef.get().then(snapshot =>{
        console.log(snapshot.val() || [])
        this.coffeeMakers = snapshot.val()
      })
      this.dbRef.on('value', (snapshot) => {
        console.log(snapshot.val() || [])
      })
    })
    
  }
  registerCoffee(coffeeMaker: CoffeeMaker) {
    this.coffeeMakers.push(coffeeMaker)
    if (this.dbRef) {
      this.dbRef.set(this.coffeeMakers);
    }
  }

}
