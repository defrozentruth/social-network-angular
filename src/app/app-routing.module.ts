import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AuthComponent} from "./auth/auth.component";
import {AdminComponent} from "./admin/admin.component";
import {HttpClientModule} from "@angular/common/http";
import {RegisterComponent} from "./register/register.component";
import {AuthGuard} from "./guard/auth.guard";
import {AdminGuard} from "./guard/admin.guard";
import {UserPageComponent} from "./user-page/user-page.component";
import {UserListComponent} from "./user-list/user-list.component";
import {NewsFeedComponent} from "./news-feed/news-feed.component";
import {MessagesComponent} from "./messages/messages.component";
import {ChatComponent} from "./chat/chat.component";


const routes: Routes = [
  {path: '', pathMatch: "full", redirectTo: '/login'},
  {path: 'login', component: AuthComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'user/:id', component: UserPageComponent, canActivate: [AuthGuard]},
  {path: 'friends/:id', component: UserListComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UserListComponent, canActivate: [AuthGuard]},
  {path: 'news-feed', component: NewsFeedComponent, canActivate: [AuthGuard]},
  {path: 'chats', component: MessagesComponent, canActivate: [AuthGuard]},
  {path: 'chat/:id', component: ChatComponent, canActivate: [AuthGuard]},
]

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
