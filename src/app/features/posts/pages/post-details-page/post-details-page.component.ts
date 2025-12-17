import { Component } from '@angular/core';
import { PostCommentComponent } from './components/post-comment/post-comment.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { IconButtonComponent } from '../../../../shared/components/icon-button/icon-button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { IPost } from '../../../../core/models/post.model';
import { ApiService } from '../../../../core/services/api-service';

@Component({
  selector: 'app-post-details-page',
  imports: [PostCommentComponent, CommentFormComponent, IconButtonComponent],
  templateUrl: './post-details-page.component.html',
})
export class PostDetailsPageComponent {
  post!: IPost;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');

    if (postId) {
      this.api.get<IPost>(`posts/${postId}`).subscribe((data) => {
        this.post = data;
      });
    }
  }

  editPost() {
    this.router.navigate([`/post/edit/${this.post.id}`]);
  }

  deletePost() {}

  goBackToPosts() {
    this.router.navigate(['/posts']);
  }
}
