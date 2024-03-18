import { Person } from '@/models/person.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent {
  people: Person[] = [
    new Person('Isra', 'Diaz', 34, 64, 1.64),
    new Person('OMar', 'Diaz', 24, 54, 1.74),
    new Person('Belen', 'Patricia', 24, 54, 1.54),
  ];
  selectedPerson: Person | null = null;

  onPersonSelected(person: Person) {
    this.selectedPerson = person;
  }
}
