import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CountryService} from '../../../core/services/country.service';
import {Observable, of} from 'rxjs';
import {Country} from '../../../model/country.model';
import {switchMap} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html'
})
export class PrivateComponent implements OnInit {

  @ViewChild('uploadRef') uploadRef: ElementRef;

  countries$: Observable<Country[]>;

  form: FormGroup;

  constructor(
    private countryService: CountryService,
    private changeDetectorRef: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) {
    this.countries$ = this.countryService.get();

    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      isoCode: [null, Validators.required],
      file: [null]
    });
  }

  ngOnInit(): void {
  }

  upload(): void {
    this.uploadRef.nativeElement.click();
  }

  fileLoad($event: Event): void {
    const reader = new FileReader();

    const files = ($event.target as HTMLInputElement).files;

    if (files && files.length) {
      // @ts-ignore
      const [file] = ($event.target as HTMLInputElement).files;

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.form.patchValue({
          file: reader.result
        });
        ($event.target as HTMLInputElement).value = null;
        this.changeDetectorRef.markForCheck();
      };
    }
  }

  delete(id: number): void {
    this.countryService.delete(id).pipe(
      switchMap(() => { this.countries$ = this.countryService.get(); return of(null); })
    ).subscribe(console.log);
  }

  submit(): void {
    this.countryService.add(this.form.value).pipe(
      switchMap(() => { this.countries$ = this.countryService.get(); return of(null); })
    ).subscribe(console.log);
  }
}
