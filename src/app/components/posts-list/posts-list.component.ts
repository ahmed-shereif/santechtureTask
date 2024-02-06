import { Component, importProvidersFrom } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { PostsService } from '../../service/posts.service';
import { Post } from '../../models/posts';
import { MessageModule } from 'primeng/message';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, FormsModule, TableModule, HttpClientModule, InputTextModule, InputTextareaModule, CommonModule, ButtonModule, MessageModule, ToastModule],
  providers: [PostsService, HttpClient, MessageService,],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss'
})
export class PostsListComponent {
  public posts!: Post[];
  public totalRecords: number = 100;
  public loading: boolean = false;
  public selectedPost!: Post;

  constructor(
    public _PostsService: PostsService,
    private messageService: MessageService,
    private router: Router) {

  }

  ngOnInit() {
  }
  loadPosts(event: TableLazyLoadEvent) {
    this.loading = true;
    this._PostsService.getAllPostsPaginated(event.first, event.rows).subscribe(
      {
        next: (data: Post[]) => {
          this.posts = data;
          this.loading = false;
        },
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Error occured', detail: `${e}` }),
        complete: () => console.info('complete')
      }
    )

  }

  onRowEditInit(post: Post) {
  }

  onRowEditSave(post: Post) {

    this._PostsService.editRow(post.id, post).subscribe({
      next: (v) => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Post is updated' }),
      error: (e) => this.messageService.add({ severity: 'error', summary: 'Error occured', detail: `${e}` }),
      complete: () => console.info('complete')
    })

  }

  onRowEditCancel(post: Post, index: number) {
  }


  onRowSelect(event: any) {
    this.router.navigate(['post', event.data.id]);
  }
}
