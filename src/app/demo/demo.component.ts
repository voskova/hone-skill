import {
  Component,
  ComponentFactoryResolver,
  ComponentRef, Injector,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { DynamicGreetingsComponent } from '../shared/dynamic-greetings/dynamic-greetings.component';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit, OnDestroy {
  @ViewChild('dynamicContent', { read: ViewContainerRef }) dynamicContent: ViewContainerRef;

  name = 'Antony';
  componentRef: ComponentRef<unknown>;
  control = new FormControl('TWO', [Validators.required]);
  options = ['ONE', 'TWO', 'THREE'];

  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    const injector = Injector.create({
      providers: [{
        provide: 'data',
        useValue: {
          name: this.name
        }
      }]
    });

    const factory = this.resolver.resolveComponentFactory(DynamicGreetingsComponent);
    this.componentRef = this.dynamicContent.createComponent(factory, 0, injector);
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

}
