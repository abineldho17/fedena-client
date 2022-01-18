import { HttpClient } from '@angular/common/http';
import {  Injectable, OnInit } from '@angular/core';
import { AppSettings } from './app-settings';


@Injectable({
    providedIn: 'root'
  })
  
  export class Password {
     public static api_url = AppSettings.api_url;
    // api_url ="https://fconnect.fedena.org/api/";


// body = {
//     old_password: 'S3211',
//     new_password: 'S1123'
// }

    constructor(public http: HttpClient) {
    }



  ngOnInit() {
    
  }


  reset(login){
    const body = {
        old_password:  login.old_password,
        new_password: login.new_password
    }
    let header = {
        Authorization: 'Bearer token='+ window.localStorage.getItem("access_token")+';',
       
        'X-Client': 'identity=CeDwAKo49aSr9tYu87HMurJL;',
              Accept: 'application/json; version=1;',
  
  
      }
    //   let old_password='S3211';
    //   let new_password='S1123';
    //   let payloadParam = old_password + new_password;
  
    const apiUrl = Password.api_url + "app_tokens/reset_password" ;
    return this.http.post(`${apiUrl}`,body, { headers: header });
  }

}