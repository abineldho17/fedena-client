import { Component, OnInit } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { AppSettings } from 'src/providers/app-settings'
import { Router } from '@angular/router'
import { Reports } from 'src/providers/reports'
import { LoadingController, ModalController } from '@ionic/angular'

import { FilterReportsPage } from 'src/app/filter-reports/filter-reports.page'
@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
  status = true

  view: boolean = true

  selectedSegment: string = 'user_entry_log'
  private selectedView: string = 'tableView'

  totalUser: any
  tableData: []

  graphUser: any
  graphData: []

  api = {
    entryTpe: '',
    date_range: '',
    start_date: '',
    end_date: '',
  }
  modelData: any

  userEntryTable = {
    entryType: '',
    date_range: '',
    start_date: '',
    end_date: '',
  }
  userEntryGraph = {
    entryType: '',
    date_range: '',
    start_date: '',
    end_date: '',
  }
  gatePassTable = {
    entryType: '',
    date_range: '',
    start_date: '',
    end_date: '',
  }
  gatePassGraph = {
    entryType: '',
    date_range: '',
    start_date: '',
    end_date: '',
  }
  visitorEntryTable = {
    entryType: '',
    date_range: '',
    start_date: '',
    end_date: '',
  }
  visitorEntryGraph = {
    entryType: '',
    date_range: '',
    start_date: '',
    end_date: '',
  }
  loading: HTMLIonLoadingElement
  fetchLocation: string
  constructor(
    public loadingController: LoadingController,
    private http: HttpClient,
    private route: Router,
    private reportService: Reports,
    public modalController: ModalController,
  ) {}

  ngOnInit() {
    this.checkingSegmentView()
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingController.create({
      message,
      duration: 1000,
    })
    return this.loading.present()
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: FilterReportsPage,
      cssClass: 'my-custom-class',
      componentProps: {},
    })

    modal.onDidDismiss().then((res) => {
      if (this.selectedSegment == 'user_entry_log') {
        if (this.view == true) {
          this.userEntryTable.date_range = res.data.date_range
          this.userEntryTable.start_date = res.data.start_date
          this.userEntryTable.end_date = res.data.end_date
        } else {
          this.fetchLocation = 'user_entry_log_graph'
          console.log(this.fetchLocation)
          this.userEntryGraph.date_range = res.data.date_range
          this.userEntryGraph.start_date = res.data.start_date
          this.userEntryGraph.end_date = res.data.end_date
        }
      } else if (this.selectedSegment == 'gate_pass') {
        if (this.view == true) {
          this.fetchLocation = 'gate_pass_table'
          console.log(this.fetchLocation)
          this.gatePassTable.date_range = res.data.date_range
          this.gatePassTable.start_date = res.data.start_date
          this.gatePassTable.end_date = res.data.end_date
        } else {
          this.fetchLocation = 'gate_pass_graph'
          console.log(this.fetchLocation)
          this.gatePassGraph.date_range = res.data.date_range
          this.gatePassGraph.start_date = res.data.start_date
          this.gatePassGraph.end_date = res.data.end_date
        }
      } else {
        if (this.view == true) {
          this.fetchLocation = 'visitor_record_table'
          console.log(this.fetchLocation)
          this.visitorEntryTable.date_range = res.data.date_range
          this.visitorEntryTable.start_date = res.data.start_dat
          this.visitorEntryTable.end_date = res.data.end_date
        } else {
          this.fetchLocation = 'visitor_record_graph'
          console.log(this.fetchLocation)
          this.visitorEntryGraph.date_range = res.data.date_range
          this.visitorEntryGraph.start_date = res.data.start_date
          this.visitorEntryGraph.end_date = res.data.end_date
        }
      }
      this.onChangeView()
    })
    await modal.present()
  }

  onChangeView() {
    if (this.view) {
      console.log('true')

      this.checkingSegmentView()
    } else {
      console.log('false')

      this.checkingSegmentView()
    }
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev)
    this.selectedSegment = ev.target.value

    this.onChangeView()
  }

  realApiTable(api) {
    this.presentLoading('loading table data')

    api.entryTpe = this.selectedSegment

    if (api.date_range == 'custom') {
      console.log('check1')
      const httpParams = new HttpParams({
        fromObject: {
          page: '1',
          entry_type: api.entryTpe,
          date_range: api.date_range,

          start_date: api.start_date,
          end_date: api.end_date,
        },
      })
      const apiUrl = Reports.api_url + 'gate_management/reports?' + httpParams
      this.reportService.getTableData(apiUrl).subscribe((res) => {
        this.loadingController.dismiss()

        this.totalUser = res
        this.tableData = this.totalUser.data
        console.log(this.tableData)
      })
    } else {
      const httpParams = new HttpParams({
        fromObject: {
          page: '1',
          entry_type: api.entryTpe,
          date_range: api.date_range,
        },
      })
      const apiUrl = Reports.api_url + 'gate_management/reports?' + httpParams
      this.reportService.getTableData(apiUrl).subscribe((res) => {
        this.loadingController.dismiss()

        this.totalUser = res
        this.tableData = this.totalUser.data
        console.log(this.tableData)
      })
    }
  }

  realApiGraph(api) {
    this.presentLoading('loading table data')
    if (api.date_range == 'custom') {
      const httpParams = new HttpParams({
        fromObject: {
          page: '1',
          entry_type: api.entryTpe,
          date_range: api.date_range,

          start_date: api.start_date,
          end_date: api.end_date,
        },
      })
      const apiUrl = Reports.api_url + 'gate_management/reports?' + httpParams
      api.entryTpe = this.selectedSegment
      this.reportService.getGraphData(apiUrl).subscribe((res) => {
        this.loadingController.dismiss()

        this.totalUser = res
        this.tableData = this.totalUser.data
        console.log(this.tableData)
      })
    } else {
      const httpParams = new HttpParams({
        fromObject: {
          page: '1',
          entry_type: api.entryTpe,
          date_range: api.date_range,

          start_date: api.start_date,
          end_date: api.end_date,
        },
      })
      const apiUrl = Reports.api_url + 'gate_management/reports?' + httpParams
      api.entryTpe = this.selectedSegment
      this.reportService.getGraphData(apiUrl).subscribe((res) => {
        this.loadingController.dismiss()

        this.totalUser = res
        this.tableData = this.totalUser.data
        console.log(this.tableData)
      })
    }
  }

  checkingSegmentView() {
    if (this.selectedSegment == 'user_entry_log') {
      if (this.view == true) {
        this.userEntryTable.entryType = 'user_entry_log'
        this.realApiTable(this.userEntryTable)
      } else {
        this.userEntryGraph.entryType = 'user_entry_log'
        this.realApiGraph(this.userEntryGraph)
      }
    } else if (this.selectedSegment == 'gate_pass') {
      if (this.view == true) {
        this.gatePassTable.entryType = 'gate_pass'
        this.realApiTable(this.gatePassTable)
      } else {
        this.gatePassGraph.entryType = 'gate_pass'
        this.realApiGraph(this.gatePassGraph)
      }
    } else {
      if (this.view == true) {
        this.visitorEntryTable.entryType = 'visitor_record'
        this.realApiTable(this.visitorEntryTable)
      } else {
        this.visitorEntryGraph.entryType = 'visitor_record'
        this.realApiGraph(this.visitorEntryGraph)
      }
    }
  }
}
