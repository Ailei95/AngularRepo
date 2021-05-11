import {Car} from './car.model';

export interface User {
   id: string;
   name: string;
   surname: string;
   birthday: Date;
   sex: string;
   phone: string;
   cars: Car[];
}
