import { HttpClient } from '@angular/common/http';
import {  Injectable, OnInit } from '@angular/core';
  // import { resolve } from 'dns';
//  import  * as data from '../../app_config.json';
import { AppSettings } from './app-settings';


@Injectable({
    providedIn: 'root'
  })
  
  export class Details {
     public static api_url = AppSettings.api_url;
    // api_url ="https://fconnect.fedena.org/api/";
    constructor(public http: HttpClient) {
    }



  ngOnInit() {
    
  }

//   getData(event) {
//     console.log(this.page_number);
//     this.http.get("http://fconnect.t.foradian.org/api/news.json?page=" + this.page_number).subscribe(
//       (res: any) => {


    getData(page_number = 0) {
        
         
            const apiUrl = Details.api_url + "news.json?page="+ page_number ;
               return this.http.get(`${apiUrl}`);
    
      }


}
