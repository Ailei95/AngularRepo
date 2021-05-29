import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, NgZone, OnDestroy, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Confirmation} from '../../../model/confirmation.model';
import {Router} from '@angular/router';
import {RegistrationService} from '../../../core/services/registration.service';

@Component({
  selector: 'app-registration-modal',
  templateUrl: './registration-modal.component.html'
})
export class RegistrationModalComponent implements AfterViewInit, OnDestroy {

  @ViewChild('coolDownRef') coolDownRef: ElementRef;

  readonly TIME = 60 as const;

  timer: any;
  coolDown: number;
  disabled: boolean;

  constructor(
    public dialogRef: MatDialogRef<RegistrationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Confirmation,
    private registrationService: RegistrationService,
    private router: Router,
    private ngZone: NgZone,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.disabled = true;
    this.coolDown = this.TIME;
  }

  ngAfterViewInit(): void {
    this.startCoolDown();
  }

  login(): void {
    this.router.navigate(['/login']).then(() => this.dialogRef.close());
  }

  resend(): void {
    this.registrationService.resend(this.data?.email).subscribe(() => this.startCoolDown());
  }

  startCoolDown(): void {
    this.disabled = true;
    this.coolDown = this.TIME;

    this.ngZone.runOutsideAngular(() => {
      this.timer = setInterval(() => {
        if (this.coolDown-- > 0) {
          this.coolDownRef.nativeElement.innerHTML = this.coolDown + ' secs.';
        } else {
          this.disabled = false;
          this.changeDetectorRef.detectChanges();
          clearInterval(this.timer);
        }
      }, 1000);
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
