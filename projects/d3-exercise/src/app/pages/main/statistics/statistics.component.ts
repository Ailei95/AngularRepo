import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html'
})
export class StatisticsComponent implements OnInit {

  show: boolean;

  @ViewChild('button') button: ElementRef;
  @ViewChild('dropList') dropList: ElementRef;

  constructor(
  ) {
    this.show = false;
  }

  ngOnInit(): void {
  }

  @HostListener('document:click', ['$event']) onClick($event: MouseEvent): void {
    if (this.show && !this.button?.nativeElement.contains($event.target)
      && !this.dropList?.nativeElement.contains($event.target)) {
      this.show = false;
    }
  }
}
