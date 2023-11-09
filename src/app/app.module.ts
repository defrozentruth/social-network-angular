import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import { RegisterComponent } from './register/register.component';
import {RouterModule, Routes} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {UserService} from "./service/user.service";
import {AdminComponent} from "./admin/admin.component";
import {AuthService} from "./service/auth.service";
import { UserPageComponent } from './user-page/user-page.component';
import {AuthInterceptor} from "./service/auth-interceptor.service";
import { UserListComponent } from './user-list/user-list.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import { MessagesComponent } from './messages/messages.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import { ChatCardComponent } from './chat-card/chat-card.component';
import { NewsCardComponent } from './news-card/news-card.component';
import {MessageService} from "./service/message.service";
import { ChatComponent } from './chat/chat.component';
import { MessageCardComponent } from './message-card/message-card.component';
import { MessageInputComponent } from './message-input/message-input.component';
import { NewsPublishingComponent } from './news-publishing/news-publishing.component';
import { UserCardComponent } from './user-card/user-card.component';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import { UserCardsDialogComponent } from './user-cards-dialog/user-cards-dialog.component';

const routes: Routes = [
  {path: 'login', component: AuthComponent},
  {path: 'admin', component: AdminComponent},
]

const config: SocketIoConfig = {url: 'http://localhost:8080', options: {}};

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegisterComponent,
    AdminComponent,
    UserPageComponent,
    UserListComponent,
    NewsFeedComponent,
    MessagesComponent,
    ChatCardComponent,
    ChatComponent,
    MessageCardComponent,
    MessageInputComponent,
    NewsPublishingComponent,
    NewsCardComponent,
    UserCardComponent,
    UserCardsDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    SocketIoModule.forRoot(config),
    NoopAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
  ],
  providers: [UserService, AuthService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, MessageService],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
