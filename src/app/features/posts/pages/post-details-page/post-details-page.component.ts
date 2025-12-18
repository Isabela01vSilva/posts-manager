import { Component } from '@angular/core';
import { PostCommentComponent } from './components/post-comment/post-comment.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { IconButtonComponent } from '../../../../shared/components/icon-button/icon-button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { IPost } from '../../../../core/models/post.model';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';
import { PostsService } from '../../../../core/services/posts-service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-post-details-page',
  imports: [
    PostCommentComponent,
    CommentFormComponent,
    IconButtonComponent,
    ConfirmModalComponent,
  ],
  templateUrl: './post-details-page.component.html',
})
export class PostDetailsPageComponent {
  post!: IPost;
  selectedPostId!: number;

  isConfirmOpen = false;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const postId = this.route.snapshot.paramMap.get('id');

    if (!postId) return;

    const posts = (await firstValueFrom(this.postsService.loadPosts())) || [];
    const post = posts.find((p) => p.id === +postId);

    if (post) {
      this.post = post;
    }
  }

  editPost() {
    this.router.navigate([`/post/edit/${this.post.id}`]);
  }

  goBackToPosts() {
    this.router.navigate(['/posts']);
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
