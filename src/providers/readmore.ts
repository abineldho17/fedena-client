import { HttpClient } from '@angular/common/http';
import {  Injectable, OnInit } from '@angular/core';
  // import { resolve } from 'dns';
//  import  * as data from '../../app_config.json';
import { AppSettings } from './app-settings';


@Injectable({
    providedIn: 'root'
  })
  
  export class Readmore {
     public static api_url = AppSettings.api_url;
    // api_url ="https://fconnect.fedena.org/api/";
    constructor(public http: HttpClient) {
    }



  ngOnInit() {
    
  }


  getData() {
   
        const apiUrl = Readmore.api_url + "news/"+window.localStorage.getItem("id") +".json";
           return this.http.get(`${apiUrl}`);

  }

  }