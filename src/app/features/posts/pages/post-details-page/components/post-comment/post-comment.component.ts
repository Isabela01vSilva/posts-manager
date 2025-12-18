import { Component, Input, OnInit } from '@angular/core';
import { IconButtonComponent } from '../../../../../../shared/components/icon-button/icon-button.component';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IComment } from '../../../../../../core/models/comment.model';
import { CommentsService } from '../../../../../../core/services/comments-service';

@Component({
  selector: 'app-post-comment',
  imports: [IconButtonComponent, CommonModule],
  templateUrl: './post-comment.component.html',
})
export class PostCommentComponent implements OnInit {
  @Input() postId!: number;
  comments$!: Observable<IComment[]>;

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.comments$ = this.commentsService.getCommentsByPost(this.postId);
  }

  editarPost(comment: IComment) {
    this.commentsService.setEditingComment(comment);
  }

  async excluirPost(commentId: number) {
    await this.commentsService.deleteComment(commentId).toPromise();
  }
}
