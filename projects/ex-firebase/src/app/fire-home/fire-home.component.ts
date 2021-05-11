import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {combineLatest, interval, Observable, of, timer} from 'rxjs';
import {debounce, debounceTime, map, mergeMap, switchMap, take, tap} from 'rxjs/operators';
import {User} from '../models/user.model';
import {Car} from '../models/car.model';

@Component({
  selector: 'app-fire-home',
  templateUrl: './fire-home.component.html',
  styleUrls: ['./fire-home.component.css']
})
export class FireHomeComponent implements OnInit {

  selectedUser: User;
  user$: Observable<Partial<User>[]>;

  trackById = (index: number, element: User): string => element.id;

  constructor(private firestore: AngularFirestore) {
    this.firestore.collection<User>('users',
      collection => collection.where('name', '==', 'Ailei')
        .where('surname', 'in', ['Wu', 'Cheng'])
    ).valueChanges().pipe(take(1)).subscribe(console.log);
  }

  ngOnInit(): void {
    this.user$ = this.firestore.collection<User>('users').snapshotChanges()
      .pipe(
        map((x) => {
          return x.map((x2) => ({id: x2.payload.doc.id, ...x2.payload.doc.data()}));
        }),
        switchMap(x => {
          const obs$: Observable<Partial<User>>[] = x.map((x2) => {
            return this.firestore.collection<User>('users').doc(x2.id).collection<Car>('cars').snapshotChanges().pipe(
              map((x3) => {
                return {
                  ...x2,
                  cars: x3.map((x4) => ({id: x4.payload.doc.id, ...x4.payload.doc.data()}))
                };
              })
            );
          });

          return combineLatest(obs$);
        })
      );
  }

  addUser(user: User): void {
    this.firestore.collection('users').add(user).then(null);
  }

  deleteUser(user: User): void {
    this.firestore.collection('users').doc(user.id).delete().then(null);
  }

  addCar(car: Car): void {
    if (this.selectedUser) {
      this.firestore.collection('users').doc(this.selectedUser.id).collection('cars').add(car).then(console.log);
      this.selectedUser = null;
    }
  }

  deleteCar(user: User, car: Car): void {
    this.firestore.collection('users').doc(user.id).collection('cars').doc(car.id).delete().then(console.log);
  }
}
