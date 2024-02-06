import { Routes } from '@angular/router';
import { PostsDetailsComponent } from './components/posts-details/posts-details.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';

export const routes: Routes = [
    {path:'', component: PostsListComponent},
    { path: 'post/:id', component: PostsDetailsComponent },
];
