import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
import { CookieService } from '../services/cookie.service';

@Injectable()
export class SessionService {

  currentUser: any;

  constructor(private http: Http, private myUserCookie: CookieService) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  saveUserCookie(){
    this.myUserCookie.setCookie("user", this.currentUser._body, 1)
  }

  deleteUserCookie(){
    this.myUserCookie.deleteCookie("user");
  }

  signup(user) {
    return this.http.post(`http://localhost:3000/signup`, user)
      .map(res => { this.currentUser = res, this.saveUserCookie(), res.json(); })
      .catch(this.handleError);
  }

  login(user) {
    return this.http.post(`http://localhost:3000/login`, user)
      .map(res => { this.currentUser = res, this.saveUserCookie(), res.json(); })
      .catch(this.handleError);
  }

  logout() {
    return this.http.post(`http://localhost:3000/logout`, {})
      .map(res => {this.currentUser = null, this.deleteUserCookie() ,res.json(); })
      .catch(this.handleError);
  }

  getPrivateData() {
    return this.http.get(`http://localhost:3000/private`)
      .map(res => { console.log('Mi service: ', res), this.currentUser = res, res.json(); })
      .catch(this.handleError);
  }

}