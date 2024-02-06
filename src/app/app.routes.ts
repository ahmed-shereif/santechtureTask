import { Routes } from '@angular/router';
import { PostsListComponent } from './components/posts-list/posts-list.component';

export const routes: Routes = [
    {path:'', component: PostsListComponent},
    { path: 'post/:id',loadComponent:()=>import('./components/posts-details/posts-details.component').then((c)=>c.PostsDetailsComponent) },
];
