import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlightOverdue]',
})
export class HighlightOverdueDirective implements OnInit {
  @Input() dueDate: Date;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const currentDate = new Date();
    const dueDate = new Date(this.dueDate);

    if (this.isDateOverdue(dueDate, currentDate)) {
      this.el.nativeElement.style.backgroundColor = 'red';
    }
  }

  private isDateOverdue(dueDate: Date, currentDate: Date): boolean {
    dueDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    return dueDate < currentDate;
  }
}
