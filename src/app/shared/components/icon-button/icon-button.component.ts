import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  imports: [],
  templateUrl: './icon-button.component.html'
})
export class IconButtonComponent {
  @Input() icon: string = '';
  @Input() text: string = '';
  @Input() color: string ='bg-blue-500';

  @Output() clickEvent = new EventEmitter<void>();

  onClick() {
    this.clickEvent.emit();
  }
}
