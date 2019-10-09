import {Component, Inject, OnInit} from '@angular/core';

@Component({
  selector: 'app-dynamic-greetings',
  templateUrl: './dynamic-greetings.component.html',
})
export class DynamicGreetingsComponent implements OnInit {

  constructor(@Inject('data') public data) { }

  ngOnInit() {
  }

}
