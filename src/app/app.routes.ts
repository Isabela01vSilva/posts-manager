import { Routes } from '@angular/router';
import { ListPostsPageComponent } from './features/posts/pages/list-posts-page/list-posts-page.component';
import { PostDetailsPageComponent } from './features/posts/pages/post-details-page/post-details-page.component';
import { EditPostComponent } from './features/posts/pages/edit-post/edit-post.component';

export const routes: Routes = [
  { path: 'posts', component: ListPostsPageComponent },
  { path: 'post/edit/:id', component: EditPostComponent },
  { path: 'post/details/:id', component: PostDetailsPageComponent },
];
