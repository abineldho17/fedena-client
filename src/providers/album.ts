import { HttpClient } from '@angular/common/http';
import {  Injectable, OnInit } from '@angular/core';
import { AppSettings } from './app-settings';


@Injectable({
    providedIn: 'root'
  })
  
  export class Album {
     public static api_url = AppSettings.api_url;
    // api_url ="https://fconnect.fedena.org/api/";
    constructor(public http: HttpClient) {
    }



  ngOnInit() {
    
  }


  getData(page_number = 0) {
   
        const apiUrl = Album.api_url + "galleries/"+window.localStorage.getItem("album_id")+"/show_album?"+"page="+page_number;
           return this.http.get(`${apiUrl}`);

  }

}