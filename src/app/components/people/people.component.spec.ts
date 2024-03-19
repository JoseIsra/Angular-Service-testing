import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleComponent } from './people.component';
import { PersonComponent } from '../person/person.component';
import { Person } from '@/models/person.model';
import { By } from '@angular/platform-browser';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeopleComponent, PersonComponent],
    });
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of app.person', () => {
    //arrange
    component.people = [
      new Person('Isra', 'Diaz', 34, 64, 1.64),
      new Person('OMar', 'Diaz', 24, 54, 1.74),
      new Person('Belen', 'Patricia', 24, 54, 1.54),
      new Person('Rosa', 'Zapata', 24, 54, 1.54),
    ];
    fixture.detectChanges();
    // act
    const people = fixture.debugElement.queryAll(By.css('app-person'));
    //assert
    expect(people.length).toEqual(4);
  });

  it('should update selected person on click button', () => {
    //arrange
    component.people = [
      new Person('Isra', 'Diaz', 34, 64, 1.64),
      new Person('OMar', 'Diaz', 24, 54, 1.74),
    ];
    fixture.detectChanges();
    //act
    //primera persona seleccionada
    const debugElement = fixture.debugElement.query(
      By.css('app-person .btn-select'),
    );
    debugElement.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.selectedPerson).toEqual(component.people[0]);
  });

  it('should render Name and Age of selected person after succeded event', () => {
    //arrange
    const personBtn = fixture.debugElement.query(
      By.css('app-person .btn-select'),
    );
    //act first person selectd
    personBtn.triggerEventHandler('click', null);
    fixture.detectChanges();
    //assert
    expect(component.selectedPerson).toEqual(component.people[0]);
    const nameItemlist = fixture.debugElement.query(
      By.css('li[data-id="person-name"]'),
    ).nativeElement as HTMLElement;
    expect(nameItemlist.textContent).toContain(component.selectedPerson?.name);

    const ageItemlist = fixture.debugElement.query(
      By.css('li[data-id="person-age"]'),
    ).nativeElement as HTMLElement;
    expect(ageItemlist.textContent).toContain(component.selectedPerson?.age);
  });
});
