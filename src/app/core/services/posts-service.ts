import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IPost } from '../models/post.model';
import { IComment } from '../models/comment.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private api: ApiService) {}

  private postsCache$ = new BehaviorSubject<IPost[]>([]);

  loadPosts(): Observable<IPost[]> {
    if (this.postsCache$.value.length > 0) {
      return this.postsCache$.asObservable();
    }

    return this.api.get<IPost[]>('posts').pipe(
      tap((posts) => {
        const postsWithComments = posts.map((post) => ({
          ...post,
          comments: [],
        }));
        this.postsCache$.next(postsWithComments);
      })
    );
  }

  getPosts(): Observable<IPost[]> {
    return this.postsCache$.asObservable();
  }

  updatePost(updatedPost: IPost) {
    return this.api.put<IPost, IPost>(`posts/${updatedPost.id}`, updatedPost).pipe(
      tap(() => {
        const posts = this.postsCache$.value.map(p =>
          p.id === updatedPost.id ? updatedPost : p
        );
        this.postsCache$.next(posts);
      })
    );
  }

  deletePost(id: number) {
    return this.api.delete(`posts/${id}`).pipe(
      tap(() => {
        const posts = this.postsCache$.value.filter(p => p.id !== id);
        this.postsCache$.next(posts);
      })
    );
  }

  updatePostComments(postId: number, comments: IComment[]) {
    const posts = this.postsCache$.value.map(p =>
      p.id === postId ? { ...p, comments } : p
    );
    this.postsCache$.next(posts);
  }

}
