import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { firstValueFrom } from 'rxjs';
import { CommentsService } from '../../../../../../core/services/comments-service';
import { IComment } from '../../../../../../core/models/comment.model';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
})
export class CommentFormComponent implements OnInit {
  @Input() postId!: number;
  commentForm: FormGroup;
  editingComment: IComment | null = null;

  constructor(private fb: FormBuilder, private commentsService: CommentsService) {
    this.commentForm = this.fb.group({
      name: [''],
      body: [''],
    });
  }

  ngOnInit(): void {
    this.commentsService.getEditingComment().subscribe(comment => {
      if (comment && comment.postId === this.postId) {
        this.editingComment = comment;
        this.commentForm.patchValue({
          name: comment.name,
          body: comment.body
        });
      }
    });
  }

  async submitComment() {
    if (this.commentForm.valid) {
      const formValue = this.commentForm.value;
      if (this.editingComment) {
        await firstValueFrom(this.commentsService.updateComment({
          ...this.editingComment,
          ...formValue
        }));
        this.editingComment = null;
        this.commentsService.setEditingComment({ id: 0, postId: 0, name: '', body: '' });
      } else {
        await firstValueFrom(this.commentsService.createComment({
          postId: this.postId,
          ...formValue
        }));
      }

      this.commentForm.reset();
    }
  }
}
