import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {
  @Input() draggableData: any;

  constructor(private el: ElementRef) {
    this.el.nativeElement.draggable = true;
  }

  @HostListener('dragstart', ['$event']) onDragStart(event: DragEvent) {
    event.dataTransfer?.setData('text/plain', JSON.stringify(this.draggableData));
    this.el.nativeElement.classList.add('dragging');
  }

  @HostListener('dragend') onDragEnd() {
    this.el.nativeElement.classList.remove('dragging');
  }
}