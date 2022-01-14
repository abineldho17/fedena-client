import { HttpClient } from '@angular/common/http';
import {  Injectable, OnInit } from '@angular/core';
  // import { resolve } from 'dns';
//  import  * as data from '../../app_config.json';
import { AppSettings } from './app-settings';


@Injectable({
    providedIn: 'root'
  })
  
  export class Gallery {
     public static api_url = AppSettings.api_url;
    // api_url ="https://fconnect.fedena.org/api/";
    constructor(public http: HttpClient) {
    }



  ngOnInit() {
    
  }


  getData(page_number = 0) {
    // console.log(this.page_number);
   
    // this.http.get(" http://fconnect.t.foradian.org/api/galleries?page=" + this.page_number).subscribe(
     
        const apiUrl = Gallery.api_url + "galleries?page="+ page_number ;
           return this.http.get(`${apiUrl}`);

  }


}