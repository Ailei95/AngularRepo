import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {UserState} from '../../core/store/user/user.reducer';
import {logout} from '../../core/store/user/user.actions';
import {Observable} from 'rxjs';
import {User} from '../../model/user.model';
import {getUser} from '../../core/store/user/user.selectors';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  open: boolean;
  showDropDown: boolean;

  user$: Observable<User> = null;

  @ViewChild('dropdown') dropdown: ElementRef;
  @ViewChild('dropdownList') dropdownList: ElementRef;

  @ViewChild('mobile') mobile: ElementRef;
  @ViewChild('mobileList') mobileList: ElementRef;

  constructor(
    public router: Router,
    private store: Store<{ user: UserState }>
  ) {
    this.open = false;
    this.showDropDown = false;

    this.user$ = this.store.pipe(select(getUser));
  }

  ngOnInit(): void {
  }

  @HostListener('document:click', ['$event']) onClick($event: MouseEvent): void {
    if (this.showDropDown && !this.dropdown?.nativeElement.contains($event.target)
      && !this.dropdownList?.nativeElement.contains($event.target)) {
      this.showDropDown = false;
    }

    if (this.open && !this.mobile?.nativeElement.contains($event.target)
      && !this.mobileList?.nativeElement.contains($event.target)) {
      this.open = false;
    }
  }

  logout(): void {
    this.store.dispatch(logout());
  }
}
