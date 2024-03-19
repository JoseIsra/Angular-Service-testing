import { Component } from '@angular/core';
import { ReversePipe } from './reverse.pipe';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform the text "isra" to "arsi"', () => {
    const pipe = new ReversePipe();
    const result = pipe.transform('isra');
    expect(result).toEqual('arsi');
  });
  it('should transform 123 to "321"', () => {
    const pipe = new ReversePipe();
    const result = pipe.transform('123');
    expect(result).toEqual('321');
  });
});

@Component({
  template: `
    <h5>{{ text | reverse }}</h5>
    <input [(ngModel)]="text" />
  `,
})
class HostComponent {
  text = 'belen';
}

describe('Testing pipe on host component', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponent, ReversePipe],
      imports: [FormsModule],
    });
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should exist host testing component', () => {
    expect(component).toBeTruthy();
  });

  it('should reverse default text "belen" => "neleb"', () => {
    const expectedValue = 'neleb';
    const h5Debug = fixture.debugElement.query(By.css('h5'));
    const native = h5Debug.nativeElement as HTMLHeadingElement;
    expect(native.textContent).toEqual(expectedValue);
  });

  it('should update IRL ngModel input value "dune" => "enud"', () => {
    // arrange
    const expectedValue = 'enud';

    const h5Debug = fixture.debugElement.query(By.css('h5'));
    const h5El = h5Debug.nativeElement as HTMLHeadingElement;

    const inputDeb = fixture.debugElement.query(By.css('input'));
    const inputEl = inputDeb.nativeElement as HTMLInputElement;
    //act
    inputEl.value = 'dune';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    // assert
    expect(h5El.textContent).toEqual(expectedValue);
    expect(component.text).toEqual('dune');
  });
});
