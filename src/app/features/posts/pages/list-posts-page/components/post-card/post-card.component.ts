import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { IPost } from '../../../../../../core/models/post.model';
import { IconButtonComponent } from '../../../../../../shared/components/icon-button/icon-button.component';
import { ConfirmModalComponent } from '../../../../../../shared/components/confirm-modal/confirm-modal.component';
import { firstValueFrom } from 'rxjs';
import { PostsService } from '../../../../../../core/services/posts-service';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [IconButtonComponent, ConfirmModalComponent],
  templateUrl: './post-card.component.html',
})
export class PostCardComponent {
  @Input({ required: true }) post!: IPost;
  isConfirmOpen = false;

  selectedPostId!: number;

  constructor(private router: Router, private postsService: PostsService) {}

  editPost() {
    this.router.navigate([`/post/edit/${this.post.id}`]);
  }

  viewDetails() {
    this.router.navigate([`/post/details/${this.post.id}`]);
  }

  openConfirm(id: number) {
    this.selectedPostId = id;
    this.isConfirmOpen = true;
  }

  closeConfirm() {
    this.isConfirmOpen = false;
  }

  async confirmDelete(postId: number) {
    this.isConfirmOpen = false;
    await firstValueFrom(this.postsService.deletePost(postId));
    this.router.navigate(['/posts']);
  }
}
