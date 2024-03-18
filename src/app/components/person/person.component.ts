import { Person } from '@/models/person.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent {
  @Input() person: Person = new Person('', '', 0, 12, 1.54);
  @Output() personSelected = new EventEmitter<Person>();
  imc = '';

  calcImc() {
    this.imc = this.person.calcImc();
  }

  onClick() {
    this.personSelected.emit(this.person);
  }
}
