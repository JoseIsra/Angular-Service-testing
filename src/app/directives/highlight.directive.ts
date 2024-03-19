import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnChanges {
  defaultColor = 'gray';
  @Input() appHighlight = '';

  constructor(private element: ElementRef) {
    this.element.nativeElement.style.backgroundColor = this.defaultColor;
  }

  ngOnChanges(): void {
    this.element.nativeElement.style.backgroundColor =
      this.appHighlight || this.defaultColor;
  }
}
