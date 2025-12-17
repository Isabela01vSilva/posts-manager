import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-order-button',
  imports: [],
  templateUrl: './order-button.component.html',
})
export class OrderButtonComponent {
  sortOrder: 'asc' | null = null;
  isActive = false;

  @Output() sortChange = new EventEmitter<'asc' | null>();

  toggleSort() {
    this.isActive = !this.isActive;
    this.sortOrder = this.isActive ? 'asc' : null;
    this.sortChange.emit(this.sortOrder); 
  }
}
