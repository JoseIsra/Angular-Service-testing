import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersComponent } from './others.component';
import { ReversePipe } from '@/pipes/reverse.pipe';
import { HighlightDirective } from '@/directives/highlight.directive';
import { FormsModule } from '@angular/forms';

describe('OthersComponent', () => {
  let component: OthersComponent;
  let fixture: ComponentFixture<OthersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OthersComponent, ReversePipe, HighlightDirective],
      imports: [FormsModule],
    });
    fixture = TestBed.createComponent(OthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
