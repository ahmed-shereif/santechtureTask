import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { Post } from '../../models/posts';
import { PostDetails } from '../../models/postDetails';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-posts-details',
  standalone: true,
  imports: [CardModule, HttpClientModule,CommonModule],
  providers: [HttpClient],

  templateUrl: './posts-details.component.html',
  styleUrl: './posts-details.component.scss'
})
export class PostsDetailsComponent {
  public postDetails!: PostDetails[]
  constructor(private route: ActivatedRoute, public http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.http.get<PostDetails[]>(` https://jsonplaceholder.typicode.com/comments?postId=${id}`).subscribe({
        next: (data: PostDetails[]) => {
          this.postDetails = data
          console.log('🤱',   this.postDetails )
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      }
      )
      console.log('Parameter value:', id);
      // Use the parameter value as needed
    });
  }
}
