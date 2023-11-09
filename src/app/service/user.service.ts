import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _token: any
  private _user: any
  constructor(private http: HttpClient) { }

  public getUsers = () => {
    return this.http.get('/api/user')
  }

  public getFriends = (id: number) => {
    return this.http.get(`api/friend/${id}`)
  }

  get token() {
    return sessionStorage.getItem("ACCESS_TOKEN")
  }

  set token(value){
    sessionStorage.setItem("ACCESS_TOKEN", value!)
  }

  public removeToken = () => {
    sessionStorage.removeItem("ACCESS_TOKEN")
  }

  get user(){
    const user = sessionStorage.getItem("USER_DATA")
    return user ? JSON.parse(user) : null
  }

  set user(value){
    sessionStorage.setItem("USER_DATA", JSON.stringify(value!))
  }

  removeUserData(): void {
    sessionStorage.removeItem("USER_DATA");
  }

  public getUserById = (id: number) =>{
    return this.http.get(`api/user/${id}`)
  }

  public getUserNews = (id: number) => {
    return this.http.get(`api/news/${id}`)
  }

  public getUserFeed = () => {
    return this.http.get(`api/news/feed/${this.user.id}`)
  }

  public addFriend = (id: number) => {
    const headers = new HttpHeaders({
      "Content-type": "application/json"
    })
    this.http.post(`api/friend/${this.user.id}/${id}`, {}, { headers }).subscribe({
      next: value => {this.user = value}
    })
  }

  public deleteFriend = (id: number) => {
    const headers = new HttpHeaders({
      "Content-type": "application/json"
    })
    return this.http.delete(`api/friend/${this.user.id}/${id}`,{ headers }).subscribe({
      next: value => {this.user = value}
    })
  }
}
