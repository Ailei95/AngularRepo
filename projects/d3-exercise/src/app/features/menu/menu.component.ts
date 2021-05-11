import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  open: boolean;
  showDropDown: boolean;

  @ViewChild('dropdown') dropdown: ElementRef;
  @ViewChild('dropdownList') dropdownList: ElementRef;

  constructor(
    public router: Router
  ) {
    this.open = false;
    this.showDropDown = false;
  }

  ngOnInit(): void {
  }

  @HostListener('document:click', ['$event']) onClick($event: MouseEvent): void {
    if (!this.dropdown.nativeElement.contains($event.target)
      && !this.dropdownList?.nativeElement.contains($event.target)
      && this.showDropDown) {
      this.showDropDown = false;
    }
  }

  async logout(): Promise<void> {
    await this.router.navigate(['/login']);
  }
}
