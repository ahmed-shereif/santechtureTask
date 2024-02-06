import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/posts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
 

})
export class PostsService {

  constructor(public http: HttpClient) { }

  getAllPosts():Observable<Post[]> {
    return this.http.get<Post[]>(`https://jsonplaceholder.typicode.com/posts`)
  }
  getAllPostsPaginated(start:number|undefined|null,limit:number|undefined|null):Observable<Post[]> {
    return this.http.get<Post[]>(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`)
  }
  editRow(id:number,post:Post):Observable<any> {
    return this.http.put<Post[]>(`https://jsonplaceholder.typicode.com/posts/${id}`,post)
  }
}
