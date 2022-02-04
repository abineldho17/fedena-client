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
    const httpParams = new HttpParams({
      fromObject: {
        page: '1',
        entry_type: data.entryTpe,
        date_range: data.date_range,

        start_date: data.start_date,
        end_date: data.end_date,
      },
    })
    const apiUrl = Reports.api_url + 'gate_management/reports?' + httpParams
    return this.http.get(`${apiUrl}`)
  }

  getGraphData(data) {
    const httpParams = new HttpParams({
      fromObject: {
        page: '1',
        entry_type: data.entryTpe,
        date_range: data.date_range,
        start_date: data.start_date,
        end_date: data.end_date,
      },
    })
    const apiUrl = Reports.api_url + 'gate_management/statistics?' + httpParams
    return this.http.get(`${apiUrl}`)
  }
}
