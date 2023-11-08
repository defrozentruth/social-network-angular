import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {RegisterData, User} from "../model/user";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static userService: UserService
  static router: Router
  constructor(
      private http: HttpClient,
      router: Router,
      userService: UserService
  ) {
    AuthService.userService = userService
    AuthService.router = router
  }

  public signIn(userData: User){
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    })

    const data = JSON.stringify({
      email: userData.email,
      password: userData.password
    })

    return this.http.post('api/auth/login', data, {headers: headers})
  }

  static async logout() {
    this.userService.removeToken()
    this.userService.removeUserData()
    AuthService.router.navigateByUrl('/login')
  }

  public isLoggedIn() {
    return AuthService.userService.token !== null
  }

  public register(userData: RegisterData){
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    })

    const data = JSON.stringify({
      email: userData.email,
      password: userData.password,
      name: userData.name
    })

    return this.http.post('/api/auth/register', data, {headers: headers})
  }
}
