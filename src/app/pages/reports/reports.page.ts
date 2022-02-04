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

  data = {
    entryTpe: '',
    date_range: '',
    start_date: '',
    end_date: '',
  }
  modelData: any

  userEntryTable = {
    entryType: '',
    data_range: '',
    start_date: '',
    end_date: '',
  }
  userEntryGraph = {
    entryType: '',
    data_range: '',
    start_date: '',
    end_date: '',
  }
  gatePassTable = {
    entryType: '',
    data_range: '',
    start_date: '',
    end_date: '',
  }
  gatePassGraph = {
    entryType: '',
    data_range: '',
    start_date: '',
    end_date: '',
  }
  visitorEntryTable = {
    entryType: '',
    data_range: '',
    start_date: '',
    end_date: '',
  }
  visitorEntryGraph = {
    entryType: '',
    data_range: '',
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
    this.getTableData()
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
          // this.fetchLocation = 'user_entry_log_table'
          // console.log(this.fetchLocation)
          this.userEntryTable.data_range = res.data.date_range
          this.userEntryTable.start_date = res.data.start_date
          this.userEntryTable.end_date = res.data.end_date
          this.userEntryTable.entryType = 'user_entry_log'
        } else {
          this.fetchLocation = 'user_entry_log_graph'
          console.log(this.fetchLocation)
          this.userEntryGraph.data_range = res.data.date_range
          this.userEntryGraph.start_date = res.data.start_date
          this.userEntryGraph.end_date = res.data.end_date
          this.userEntryTable.entryType = 'user_entry_log'
        }
      } else if (this.selectedSegment == 'gate_pass') {
        if (this.view == true) {
          this.fetchLocation = 'gate_pass_table'
          console.log(this.fetchLocation)
          this.gatePassTable.data_range = res.data.date_range
          this.gatePassTable.start_date = res.data.start_date
          this.gatePassTable.end_date = res.data.end_date
          this.gatePassTable.entryType = 'gate_pass'
        } else {
          this.fetchLocation = 'gate_pass_graph'
          console.log(this.fetchLocation)
          this.gatePassGraph.data_range = res.data.date_range
          this.gatePassGraph.start_date = res.data.start_date
          this.gatePassGraph.end_date = res.data.end_date
          this.gatePassGraph.entryType = 'gate_pass'
        }
      } else {
        if (this.view == true) {
          this.fetchLocation = 'visitor_record_table'
          console.log(this.fetchLocation)
          this.visitorEntryTable.data_range = res.data.date_range
          this.visitorEntryTable.start_date = res.data.start_dat
          this.visitorEntryTable.end_date = res.data.end_date
          this.visitorEntryTable.entryType = 'visitor_record'
        } else {
          this.fetchLocation = 'visitor_record_graph'
          console.log(this.fetchLocation)
          this.visitorEntryGraph.data_range = res.data.date_range
          this.visitorEntryGraph.start_date = res.data.start_date
          this.visitorEntryGraph.end_date = res.data.end_date
          this.visitorEntryGraph.entryType = 'visitor_record'
        }
      }
      this.onChangeView()
    })
    await modal.present()
  }

  onChangeView() {
    if (this.view) {
      console.log('true')
      this.getTableData()
    } else {
      console.log('false')
      this.getGraphData()
    }
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev)
    this.selectedSegment = ev.target.value

    this.onChangeView()
  }

  // getTableData() {
  //   this.presentLoading('loading table data')
  //   this.data.entryTpe = this.selectedSegment
  //   this.reportService.getTableData(this.data).subscribe((res) => {
  //     this.loadingController.dismiss()

  //     this.totalUser = res
  //     this.tableData = this.totalUser.data
  //     console.log(this.tableData)
  //   })
  // }

  getTableData() {
    this.presentLoading('Loading Table Data')
    console.log(this.selectedSegment)
    this.data.entryTpe = this.selectedSegment

    if (this.selectedSegment == 'user_entry_log') {
      if (this.view == true) {
        // this.fetchLocation = 'user_entry_log_table'
        // console.log(this.fetchLocation)

        this.reportService
          .getTableData(this.userEntryTable)
          .subscribe((res) => {
            this.loadingController.dismiss()
            console.log(res)
            this.totalUser = res
            // console.log(this.totalUser.data[0]);
            this.totalUser = this.totalUser.data
            console.log(this.totalUser)
          })
      } else {
        this.fetchLocation = 'user_entry_log_graph'
        console.log(this.fetchLocation)
      }
    } else if (this.selectedSegment == 'gate_pass') {
      if (this.view == true) {
        this.fetchLocation = 'gate_pass_table'
        console.log(this.fetchLocation)

        this.reportService.getTableData(this.gatePassTable).subscribe((res) => {
          this.loadingController.dismiss()
          console.log(res)
          this.totalUser = res
          // console.log(this.totalUser.data[0]);
          this.totalUser = this.totalUser.data
          console.log(this.totalUser)
        })
      } else {
        this.fetchLocation = 'gate_pass_graph'
        console.log(this.fetchLocation)
      }
    } else {
      if (this.view == true) {
        this.fetchLocation = 'visitor_record_table'
        console.log(this.fetchLocation)

        this.reportService
          .getTableData(this.visitorEntryTable)
          .subscribe((res) => {
            this.loadingController.dismiss()
            console.log(res)
            this.totalUser = res
            // console.log(this.totalUser.data[0]);
            this.totalUser = this.totalUser.data
            console.log(this.totalUser)
          })
      } else {
        this.fetchLocation = 'visitor_record_graph'
        console.log(this.fetchLocation)
      }
    }

  }

  

  getGraphData() {
    this.presentLoading('Loading Graph Data')
    console.log(this.selectedSegment)
    this.data.entryTpe = this.selectedSegment

    if (this.selectedSegment == 'user_entry_log') {
      if (this.view == false) {
        // this.fetchLocation = 'user_entry_log_table'
        // console.log(this.fetchLocation)
      } else {
        this.fetchLocation = 'user_entry_log_graph'
        console.log(this.fetchLocation)

        this.reportService
          .getGraphData(this.userEntryGraph)
          .subscribe((res) => {
            this.loadingController.dismiss()
            console.log(res)
            this.graphUser = res
            this.graphData = this.graphUser.data
            console.log(this.graphData)
          })
      }
    } else if (this.selectedSegment == 'gate_pass') {
      if (this.view == false) {
        this.fetchLocation = 'gate_pass_table'
        console.log(this.fetchLocation)
      } else {
        this.fetchLocation = 'gate_pass_graph'
        console.log(this.fetchLocation)

        this.reportService.getGraphData(this.gatePassGraph).subscribe((res) => {
          this.loadingController.dismiss()
          console.log(res)
          this.graphUser = res
          this.graphData = this.graphUser.data
          console.log(this.graphData)
        })
      }
    } else {
      if (this.view == false) {
        this.fetchLocation = 'visitor_record_table'
        console.log(this.fetchLocation)
      } else {
        this.fetchLocation = 'visitor_record_graph'
        console.log(this.fetchLocation)

        this.reportService
          .getGraphData(this.visitorEntryGraph)
          .subscribe((res) => {
            this.loadingController.dismiss()
            console.log(res)
            this.graphUser = res
            this.graphData = this.graphUser.data
            console.log(this.graphData)
          })
      }
    }
  }
}
