import { HttpClient } from '@angular/common/http';
import {  Injectable, OnInit } from '@angular/core';
  // import { resolve } from 'dns';
//  import  * as data from '../../app_config.json';
import { AppSettings } from './app-settings';


@Injectable({
    providedIn: 'root'
  })
  
  export class Attendance {
     public static api_url = AppSettings.api_url;
    // api_url ="https://fconnect.fedena.org/api/";
    constructor(public http: HttpClient) {
    }



  ngOnInit() {
    
  }
  getCourse(){
    const apiUrl = Attendance.api_url + "courses" ;
    return this.http.get(`${apiUrl}`);
  }

  getBatches(){
    const batch_api = window.localStorage.getItem('course_id');
    const apiUrl = Attendance.api_url + "batches/?scope=all&course_id="+ batch_api ;
    return this.http.get(`${apiUrl}`);
  }

  getSubjects(){

    // this.http.get(this.api_url+"batches/" + this.subjectAPI  + "/subjects").subscribe(
        const subject_api =   window.localStorage.getItem('batch_id')
        const apiUrl = Attendance.api_url + "batches/"+ subject_api+"/subjects"  ;
        return this.http.get(`${apiUrl}`);
  }

//   this.api_url+"batches/?scope=all&course_id=" + courseAPI


}