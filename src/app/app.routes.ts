import { Routes } from '@angular/router';
import { ListPostsPageComponent } from './features/posts/pages/list-posts-page/list-posts-page.component';
import { PostDetailsPageComponent } from './features/posts/pages/post-details-page/post-details-page.component';
import { CreatePostComponent } from './features/posts/pages/create-post/create-post.component';

export const routes: Routes = [
  { path: 'posts', component: ListPostsPageComponent },
  { path: 'post/edit', component: CreatePostComponent },
  { path: 'post/:id', component: PostDetailsPageComponent },
];
