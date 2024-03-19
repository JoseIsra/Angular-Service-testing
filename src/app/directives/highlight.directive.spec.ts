import { Component } from '@angular/core';
import { HighlightDirective } from './highlight.directive';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  template: `
    <h5 appHighlight="green">green</h5>
    <p class="default" appHighlight>default parrafo</p>
    <p>parrafo</p>
    <input [(ngModel)]="colorPicked" [appHighlight]="colorPicked" />
  `,
})
class HostComponent {
  colorPicked = 'red';
}

fdescribe('HighlightDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponent, HighlightDirective],
      imports: [FormsModule],
    });
    fixture = TestBed.createComponent(HostComponent);

    component = fixture.componentInstance as HostComponent;
    fixture.detectChanges();
  });

  it('should create Host directive component', () => {
    expect(component).toBeTruthy();
  });

  it('it should have 3 highglight elements', () => {
    const elements = fixture.debugElement.queryAll(
      By.directive(HighlightDirective),
    );
    expect(elements.length).toEqual(3);
  });
  it('should the elements be match with the bg color', () => {
    const elements = fixture.debugElement.queryAll(
      By.directive(HighlightDirective),
    );
    expect(elements[0].nativeElement.style.backgroundColor).toEqual('green');
    expect(elements[1].nativeElement.style.backgroundColor).toEqual('gray');
  });
  it('should the elements be match with the bg color', () => {
    const elements = fixture.debugElement.queryAll(
      By.directive(HighlightDirective),
    );
    expect(elements[0].nativeElement.style.backgroundColor).toEqual('green');
    expect(elements[1].nativeElement.style.backgroundColor).toEqual('gray');
  });

  it('should defautl paragraph has default directive color', () => {
    const pDebug = fixture.debugElement.query(By.css('.default'));
    const directiveInst = pDebug.injector.get(HighlightDirective);
    expect(pDebug.nativeElement.style.backgroundColor).toEqual(
      directiveInst.defaultColor,
    );
  });

  it('should bind <input> and change bg color directive', () => {
    const inputDeb = fixture.debugElement.query(By.css('input'));
    const inputEl: HTMLInputElement = inputDeb.nativeElement;
    expect(inputEl.style.backgroundColor).toEqual('red');

    inputEl.value = 'pink';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(inputEl.style.backgroundColor).toEqual('pink');

    expect(component.colorPicked).toEqual('pink');
  });
});
