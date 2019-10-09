import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomDropdownComponent),
      multi: true
    }
  ]
})
export class CustomDropdownComponent implements ControlValueAccessor, OnDestroy {
  @Input() options: string[];

  value: string;
  innerControl: FormControl = new FormControl();
  controlChangesSub: Subscription;

  constructor(
  ) {
    this.handleInnerControlChanges();
  }

  ngOnDestroy(): void {
    this.controlChangesSub.unsubscribe();
  }

  isActive(option: string): boolean {
    return option === this.value;
  }

  writeValue(value: string): void {
    this.value = value;
    this.innerControl.setValue(value, { emitEvent: false });
    this.onChange(this.value);
  }

  onChange = (value: string) => {};

  onTouched = () => {};

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  private handleInnerControlChanges(): void {
    this.controlChangesSub = this.innerControl.valueChanges
      .pipe(map((value: string) => value && value.toUpperCase()))
      .subscribe((value: string) => {
        this.value = !value || this.options.indexOf(value) === -1 ? null : value;
        this.onChange(this.value);
    });
  }

}
