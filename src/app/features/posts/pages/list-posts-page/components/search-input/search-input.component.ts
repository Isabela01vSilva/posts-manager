import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonComponent } from "../../../../../../shared/components/button/button.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  imports: [ButtonComponent, FormsModule],
  templateUrl: './search-input.component.html'
})
export class SearchInputComponent {
  searchText: string = '';

  @Output() search = new EventEmitter<string>();

  onSearchClick() {
    this.search.emit(this.searchText);
  }
}
