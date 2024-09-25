import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDroppable]'
})
export class DroppableDirective {
  @Output() onDrop: EventEmitter<any> = new EventEmitter();

  constructor(private el: ElementRef) {}

  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
    this.el.nativeElement.classList.add('droppable-hover');
  }

  @HostListener('dragleave') onDragLeave() {
    this.el.nativeElement.classList.remove('droppable-hover');
  }

  @HostListener('drop', ['$event']) onDropEvent(event: DragEvent) {
    event.preventDefault();
    this.el.nativeElement.classList.remove('droppable-hover');

    const data = event.dataTransfer?.getData('text');
    if (data) {
      this.onDrop.emit(JSON.parse(data));
    }
  }
}