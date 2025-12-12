import { Routes } from '@angular/router';
import { ListPostsPageComponent } from './features/posts/pages/list-posts-page/list-posts-page.component';
import { PostDetailsPageComponent } from './features/posts/pages/post-details-page/post-details-page.component';

export const routes: Routes = [
  { path: '', component: ListPostsPageComponent },
  { path: 'posts', component: ListPostsPageComponent },
  { path: 'posts/:id', component: PostDetailsPageComponent },
];
