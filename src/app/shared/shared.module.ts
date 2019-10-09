import { NgModule } from '@angular/core';
import { CustomDropdownComponent } from './custom-dropdown/custom-dropdown.component';
import { DynamicGreetingsComponent } from './dynamic-greetings/dynamic-greetings.component';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    CustomDropdownComponent,
    DynamicGreetingsComponent,
  ],
  exports: [CustomDropdownComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [],
  entryComponents: [
    DynamicGreetingsComponent
  ]
})
export class SharedModule { }
