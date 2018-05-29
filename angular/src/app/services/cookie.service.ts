import { Injectable } from '@angular/core';

@Injectable()
export class CookieService {

  constructor() { }

  public getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) === 0) {
        console.log("from the cookie file: ", JSON.parse(c.substring(cookieName.length, c.length)))
        return JSON.parse(c.substring(cookieName.length, c.length));
      }
    }
    return '';
  }

  public deleteCookie(name) {
    this.setCookie(name, '', -1);
  }

  public setCookie(name: string, value: any, expireDays: number, path: string = '') {
    if ( typeof(value) !== "string")
      value = JSON.stringify(value);
    let d: Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires: string = 'expires=' + d.toUTCString();
    document.cookie = name + '=' + value + '; ' + expires + (path.length > 0 ? '; path=' + path : '');
  }

}
