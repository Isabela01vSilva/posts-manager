import { Component, OnInit } from '@angular/core';
import { IPost } from '../../../../core/models/post.model';
import { ApiService } from '../../../../core/services/api-service';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from './components/post-card/post-card.component';
import { OrderButtonComponent } from './components/order-button/order-button.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-list-posts-page',
  standalone: true,
  imports: [
    CommonModule,
    PostCardComponent,
    OrderButtonComponent,
    PaginationComponent,
    SearchInputComponent,
  ],
  templateUrl: './list-posts-page.component.html',
})
export class ListPostsPageComponent implements OnInit {
  allPosts: IPost[] = [];
  filteredPosts: IPost[] = [];
  displayedPosts: IPost[] = [];

  page = 1;
  postsPerPage = environment.postsPerPage;

  sortOrder: 'asc' | null = null;
  searchQuery = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.get<IPost[]>('posts').subscribe((posts) => {
      this.allPosts = posts;
      this.applyFilters();
    });
  }

  onSortChange(order: 'asc' | null) {
    this.sortOrder = order;
    this.applyFilters();
  }

  onSearch(query: string) {
    this.searchQuery = query;
    this.page = 1;
    this.applyFilters();
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredPosts = [...this.allPosts];
    if (this.searchQuery) {
      this.filteredPosts = this.filteredPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    if (this.sortOrder === 'asc') {
      this.filteredPosts.sort((a, b) => a.title.localeCompare(b.title));
    }
    this.updateDisplayedPosts();
  }

  updateDisplayedPosts() {
    const start = (this.page - 1) * this.postsPerPage;
    const end = start + this.postsPerPage;
    this.displayedPosts = this.filteredPosts.slice(start, end);
  }
}
