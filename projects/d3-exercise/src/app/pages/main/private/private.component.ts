import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CountryService} from '../../../core/services/country.service';
import {Observable, of} from 'rxjs';
import {Country} from '../../../model/country.model';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html'
})
export class PrivateComponent implements OnInit {

  @ViewChild('uploadRef') uploadRef: ElementRef;

  countries$: Observable<Country[]>;

  form: FormData;

  file: File;

  constructor(
    private countryService: CountryService
  ) {
    this.form = new FormData();
    this.countries$ = this.countryService.get();
  }

  ngOnInit(): void {
  }

  upload(): void {
    this.uploadRef.nativeElement.click();
  }

  fileLoad($event: Event): void {
    this.file = ($event.target as HTMLInputElement).files[0];
    this.form.set('img', this.file);
  }

  delete(id: number): void {
    this.countryService.delete(id).pipe(
      switchMap(() => { this.countries$ = this.countryService.get(); return of(null); })
    ).subscribe(console.log);
  }

  submit(name: string, isoCode: string): void {
    this.form.set('name', name);
    this.form.set('isoCode', isoCode);

    this.countryService.add(this.form).pipe(
      switchMap(() => { this.countries$ = this.countryService.get(); return of(null); })
    ).subscribe(console.log);
  }
}
