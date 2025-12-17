import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  imports: [],
  templateUrl: './confirm-modal.component.html'
})
export class ConfirmModalComponent {
  @Input() message: string = 'Tem certeza?';
  @Input() isOpen: boolean = false;
  
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
