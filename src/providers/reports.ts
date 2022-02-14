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
  httpParams: HttpParams

  constructor(public http: HttpClient) {}

  ngOnInit() {}

  getTableData(params) {
// console.log(url)
    // const httpParams = new HttpParams({
    //       fromObject: {
    //         page: '1',
    //         entry_type: url.entryTpe,
    //         date_range: url.date_range,
    //         start_date: url.start_date,
    //       },
    //     })

    const apiUrl =
    Reports.api_url + 'gate_management/reports?' + params;
    return this.http.get(`${apiUrl}` )
  }

  getGraphData(params) {
    const apiUrl =
    Reports.api_url + 'gate_management/statistics?' + params;
    return this.http.get(`${apiUrl}`)
  }
}
