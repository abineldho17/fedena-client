import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from 'src/providers/app-settings';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public static api_url = AppSettings.api_url;


  private _loginUrl = AuthService.api_url + "app_tokens?type=password";

  // private _loginUrl = "https://fconnect.fedena.org/api/app_tokens?type=password";
    // private _loginUrl = "http://fconnect.t.foradian.org/api/app_tokens?type=password";
  constructor(private http: HttpClient) { }

  loginUser(user) {
    // let payloadParam = "&username="+user.username+"&password="+user.password;
    const dp = "&username=" + user.username + "&password=" + user.password;
    window.localStorage.setItem("oldpassword", user.password);
    let header = {
      //Authorization: 'Bearer token=joKaxuoX3B57QntfYeW2Kss8;student_id=809',
      // 'Content-Type': 'application/json',
      // 'X-Client': 'identity=CeDwAKo49aSr9tYu87HMurJL;',
      //       Accept: 'application/json; version=1;',


    }


    return this.http.post<any>(this._loginUrl + dp, {}, { headers: header })
  }
}
