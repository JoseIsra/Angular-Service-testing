import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Person } from '@/models/person.model';

describe('PersonComponent', () => {
  let component: PersonComponent;
  // Ambiente / artefactro para interactuar con el componente
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonComponent],
    });
    // recibimos y creamos el compo que queremos
    fixture = TestBed.createComponent(PersonComponent);

    //con la instancia del fixture accedemos al componente mismo
    component = fixture.componentInstance;
    // el ciclo de vida de angular
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the name be "Isra"', () => {
    component.person = new Person('Isra', 'Diaz', 22, 65, 1.88);
    expect(component.person.name).toEqual('Isra');
  });

  it('Debería tener un <p> con texto Mi altura es 1.88', () => {
    component.person = new Person('Isra', 'Diaz', 22, 65, 1.88);

    const personElement = fixture.nativeElement as HTMLElement;
    const p = personElement.querySelector('p');
    // act
    fixture.detectChanges();
    // assert
    expect(p?.textContent).toBe('Mi altura es 1.88');
  });
  it('Debería obenter el p con el debug y css mode', () => {
    component.person = new Person('Omar', 'Diaz', 22, 65, 1.98);

    const personDebug = fixture.debugElement;
    const pDebug = personDebug.query(By.css('p'));
    // luego de obtenerlo ahora accedemos
    const paragraph = pDebug.nativeElement;
    // act
    fixture.detectChanges();
    // assert
    expect(paragraph.textContent).toBe('Mi altura es 1.98');
  });
  it('Debe tener un <h3> con texto Hola Belen', () => {
    component.person = new Person('Belen', 'Diaz', 22, 65, 1.98);
    // ÚTIL PARA CUANDO SE USA SSR
    const personDebug: DebugElement = fixture.debugElement;
    const pDebug: DebugElement = personDebug.query(By.css('h3'));
    const personElement = pDebug.nativeElement as HTMLElement;
    // act
    fixture.detectChanges();
    // const p = personElement.querySelector('h3');
    //assert
    expect(personElement?.textContent).toBe('Hola Belen');
  });
  it('Debe tener un <h3> conteniendo nombre:Belen', () => {
    component.person = new Person('Belen', 'Diaz', 22, 65, 2.0);
    // ÚTIL PARA CUANDO SE USA SSR
    const personDebug: DebugElement = fixture.debugElement;
    const pDebug: DebugElement = personDebug.query(By.css('h3'));
    const personElement = pDebug.nativeElement as HTMLElement;
    // act
    fixture.detectChanges();
    // const p = personElement.querySelector('h3');
    //assert
    expect(personElement?.textContent).toContain(component.person.name);
  });

  it('should display a text with imc when button clicked', () => {
    //arrange
    component.person = new Person('Isra', 'Diaz', 33, 64, 1.64);
    const imc = component.person.calcImc();
    const buttonDe = fixture.debugElement.query(By.css('button.btn-imc'));
    const buttonEl = buttonDe.nativeElement;

    //act
    buttonDe.triggerEventHandler('click', null);
    // button.click();
    fixture.detectChanges();
    expect(buttonEl?.textContent).toContain(imc);
  });

  // prueba a Ouput
  it('Debe emitir un evento al elegir la persona', () => {
    // arrange
    const expectPerson = new Person('Isra', 'Diaz', 33, 64, 1.64);
    component.person = expectPerson;
    const buttonDe = fixture.debugElement.query(By.css('button.btn-select'));

    let selectedPerson: Person | undefined;
    component.personSelected.subscribe((person) => {
      selectedPerson = person;
    });
    // act
    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    // assert
    expect(selectedPerson).toEqual(expectPerson);
  });
});

@Component({
  template: `<app-person
    [person]="person"
    (personSelected)="onPersonSelected($event)"
  ></app-person>`,
})
class HostComponent {
  person = new Person('Isra', 'diaz', 22, 64, 1.66);
  selectedPerson!: Person;

  onPersonSelected(person: Person) {
    this.selectedPerson = person;
  }
}
describe('Personcomponent from a HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponent, PersonComponent],
    });
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should created', () => {
    expect(component).toBeTruthy();
  });

  it('should display person name', () => {
    //arrange

    const expectedName = component.person.name;
    const h3Debug = fixture.debugElement.query(By.css('app-person h3'));
    const h3Elemnt = h3Debug.nativeElement;
    // act
    fixture.detectChanges();
    // assert
    expect(h3Elemnt.textContent).toContain(expectedName);
  });
  it('should emit selectedPerson event on click button', () => {
    //arrange

    const btnDebug = fixture.debugElement.query(
      By.css('app-person button.btn-select'),
    );
    btnDebug.triggerEventHandler('click', null);
    // act
    fixture.detectChanges();
    // assert
    expect(component.selectedPerson).toEqual(component.person);
  });
});
