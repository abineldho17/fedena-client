import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable, OnInit } from '@angular/core'
// import { resolve } from 'dns';
//  import  * as data from '../../app_config.json';
import { AppSettings } from './app-settings'

@Injectable({
  providedIn: 'root',
})
export class Reports {
  public static api_url = AppSettings.api_url
  datarangeVal: string

  constructor(public http: HttpClient) {}

  ngOnInit() {}

  getTableData(data) {
   
    return this.http.get(`${data}`)
  }

  getGraphData(data) {
   
    return this.http.get(`${data}`)
  }
}
