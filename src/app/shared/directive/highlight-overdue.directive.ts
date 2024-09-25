import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appHighlightOverdue]',
})
export class HighlightOverdueDirective implements OnInit {
  @Input() dueDate: Date;
  @Output() done: EventEmitter<string> = new EventEmitter<string>();

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const currentDate = new Date();
    const dueDate = new Date(this.dueDate);

    if (this.isDateOverdue(dueDate, currentDate)) {
      this.el.nativeElement.style.backgroundColor = 'red';
      this.done.emit('Vous avez des tickets avec une date dépassée.');
    }
  }

  private isDateOverdue(dueDate: Date, currentDate: Date): boolean {
    dueDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    return dueDate < currentDate;
  }
}
