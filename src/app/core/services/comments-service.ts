import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PostsService } from './posts-service';
import { IComment } from '../models/comment.model';

@Injectable({ providedIn: 'root' })
export class CommentsService {
  private commentsCache$ = new BehaviorSubject<IComment[]>([]);

  constructor(private postsService: PostsService) {}

  initComments() {
    this.postsService.getPosts().subscribe((posts) => {
      const allComments = posts.flatMap((p) => p.comments || []);
      this.commentsCache$.next(allComments);
    });
  }

  getCommentsByPost(postId: number): Observable<IComment[]> {
    return new Observable((observer) => {
      this.commentsCache$.subscribe((comments) => {
        observer.next(comments.filter((c) => c.postId === postId));
      });
    });
  }

  createComment(comment: Omit<IComment, 'id'>) {
    const nextId = this.commentsCache$.value.length
      ? Math.max(...this.commentsCache$.value.map((c) => c.id)) + 1
      : 1;

    const newComment: IComment = { id: nextId, ...comment };

    this.commentsCache$.next([...this.commentsCache$.value, newComment]);

    this.postsService.getPosts().subscribe((posts) => {
      const post = posts.find((p) => p.id === comment.postId);
      if (post) {
        post.comments.push(newComment);
        this.postsService.updatePostComments(post.id, post.comments);
      }
    });

    return of(newComment);
  }

  updateComment(updatedComment: IComment) {
    const comments = this.commentsCache$.value.map((c) =>
      c.id === updatedComment.id ? updatedComment : c
    );
    this.commentsCache$.next(comments);

    this.postsService.getPosts().subscribe((posts) => {
      const post = posts.find((p) => p.id === updatedComment.postId);
      if (post) {
        post.comments = post.comments.map((c) =>
          c.id === updatedComment.id ? updatedComment : c
        );
        this.postsService.updatePostComments(post.id, post.comments);
      }
    });

    return of(updatedComment);
  }

  deleteComment(id: number) {
    const comment = this.commentsCache$.value.find((c) => c.id === id);
    if (!comment) return of(false);

    const comments = this.commentsCache$.value.filter((c) => c.id !== id);
    this.commentsCache$.next(comments);

    this.postsService.getPosts().subscribe((posts) => {
      const post = posts.find((p) => p.id === comment.postId);
      if (post) {
        post.comments = post.comments.filter((c) => c.id !== id);
        this.postsService.updatePostComments(post.id, post.comments);
      }
    });

    return of(true);
  }
}
