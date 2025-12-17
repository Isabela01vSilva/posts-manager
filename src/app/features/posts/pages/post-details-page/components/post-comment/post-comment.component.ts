import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { IconButtonComponent } from '../../../../../../shared/components/icon-button/icon-button.component';

@Component({
  selector: 'app-post-comment',
  imports: [IconButtonComponent],
  templateUrl: './post-comment.component.html'
})
export class PostCommentComponent {
  constructor(private router: Router) {}

  editarPost(id: number) {
    this.router.navigate(['/post/new']);
  }
  isModalOpen = false;
  selectedPostId: number | null = null;

  excluirPost(id: number) {

  }

}
