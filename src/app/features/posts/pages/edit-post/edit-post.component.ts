import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { IPost } from '../../../../core/models/post.model';
import { ActivatedRoute, Router } from '@angular/router';

import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IconButtonComponent } from '../../../../shared/components/icon-button/icon-button.component';
import { PostsService } from '../../../../core/services/posts-service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-post',
  imports: [ButtonComponent, ReactiveFormsModule, IconButtonComponent],
  templateUrl: './edit-post.component.html',
})
export class EditPostComponent implements OnInit {
  post!: IPost;
  editForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private postsService: PostsService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.editForm = this.fb.group({
      title: [''],
      body: [''],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    const posts = await firstValueFrom(this.postsService.loadPosts());
    const post = posts.find((p) => p.id === +id);

    if (post) {
      this.post = post;
      this.editForm.patchValue({
        title: post.title,
        body: post.body,
      });
    }
  }

  async savePost(): Promise<void> {
    if (this.editForm.valid) {
      const updatedPost: IPost = {
        ...this.post,
        ...this.editForm.value,
      };

      await firstValueFrom(this.postsService.updatePost(updatedPost));
      this.router.navigate(['/posts']);
    }
  }

  goBackToPosts() {
    this.router.navigate(['/posts']);
  }
}
