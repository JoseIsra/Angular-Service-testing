import { Component, OnInit } from '@angular/core';
import { Calculator } from './calculator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ng-testing-services';
  ngOnInit() {
    const calcu = new Calculator();

    const multi = calcu.multiply(4, 10);
  }
}
