import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { IPost } from '../../../../../../core/models/post.model';
import { IconButtonComponent } from '../../../../../../shared/components/icon-button/icon-button.component';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [IconButtonComponent],
  templateUrl: './post-card.component.html',
})
export class PostCardComponent {
  @Input({ required: true }) post!: IPost;

  constructor(private router: Router) {}

  editPost() {
    this.router.navigate([`/post/edit/${this.post.id}`]);
  }

  deletePost() {}

  viewDetails() {
    this.router.navigate([`/post/details/${this.post.id}`]);
  }
}
