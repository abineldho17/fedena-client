import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { AppSettings } from 'src/providers/app-settings'
import { Router } from '@angular/router'
import { Reports } from 'src/providers/reports'
import { LoadingController, ModalController } from '@ionic/angular'

import { FilterReportsPage } from 'src/app/filter-reports/filter-reports.page'
import * as Chart from 'chart.js'
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { default as pluginDataLabels } from 'chartjs-plugin-datalabels'

// import { endianness } from 'os'
@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
  barChart: any
  status = true
  httpParams: any
  view: boolean = false

  selectedSegment: string = 'user_entry_log'
  private selectedView: string = 'tableView'
  myChart: any
  totalUser: any
  tableData: []

  graphUser: any
  graphData: []
  pageNo: any
  selectedData = {
    entryTpe: '',
    date_range: '',
    start_date: '',
    end_date: '',
  }

  dataSelected = {
    // entryTpe: '',
    date_range: '',
    start_date: '',
    end_date: '',
  }
  isShown: boolean = false
  isShown2: boolean = false

  modelData: any
  dates: []
  entry: []
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

  public columns: any
  public rows: any
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
    this.pageNo = 1
  }
  nxt() {
    this.pageNo = ++this.pageNo
    this.checkingSegmentView()
  }
  prev() {
    this.pageNo = --this.pageNo
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
      componentProps: {
        selectedVal: this.dataSelected,
      },
    })

    modal.onDidDismiss().then((res) => {
      console.log(res)
      if (res.data != undefined) {
        if (this.selectedSegment == 'user_entry_log') {
          if (this.view == false) {
            this.userEntryTable = res.data
          } else {
            this.fetchLocation = 'user_entry_log_graph'
            this.userEntryGraph = res.data
          }
        } else if (this.selectedSegment == 'gate_pass') {
          if (this.view == false) {
            // this.fetchLocation = 'gate_pass_table'
            this.gatePassTable = res.data
          } else {
            this.fetchLocation = 'gate_pass_graph'
            this.gatePassGraph = res.data
          }
        } else {
          if (this.view == false) {
            // this.fetchLocation = 'visitor_record_table'
            this.visitorEntryTable = res.data
          } else {
            // this.fetchLocation = 'visitor_record_graph'
            this.visitorEntryGraph = res.data
          }
        }
        this.onChangeView()
      }
    })
    await modal.present()
  }

  onChangeView() {
    this.pageNo = 1
    this.checkingSegmentView()
  }
 
  segmentChanged(ev: any) {
    console.log('Segment changed', ev)
    this.selectedSegment = ev.target.value
    this.onChangeView()
  }

  getTableData(selectedData) {
    console.log('table')
    console.log(selectedData.date_range)

    this.presentLoading('loading table data')

    selectedData.entryTpe = this.selectedSegment

    let params =
      'page=' +
      this.pageNo +
      ('&entry_type=' + selectedData.entryTpe) +
      (selectedData.date_range != ''
        ? '&date_range=' + selectedData.date_range
        : '') +
      (selectedData.start_date != ''
        ? '&start_date=' + selectedData.start_date
        : '') +
      (selectedData.end_date != '' ? '&end_date=' + selectedData.end_date : '')

    this.reportService.getTableData(params).subscribe((res) => {
      this.loadingController.dismiss()
      console.log(res)
      this.totalUser = res
      this.tableData = this.totalUser.data
      console.log(this.tableData)

      if (this.totalUser.data == '') {
        this.isShown = !this.isShown;
        this.isShown2 = false;

        document.getElementById('tableView').style.display = 'none'
      } else {
        this.isShown = false;
        this.isShown2 = false;
      }
    })
  }

  getGraphData(selectedData) {
    console.log('graph')
    this.presentLoading('loading graph data')

    selectedData.entryTpe = this.selectedSegment

    // (selectedData.date_range != ''
    // ? '&date_range=' + selectedData.date_range
    // : '') 



    // {
    //   (this.pageNo != '' ? '&page=' + this.pageNo : '')
    // }
    let params =
      // 'page=1' +
      // '&entry_type=' +
      // selectedData.entryTpe +
      'page=' +
      this.pageNo +
      ('&entry_type=' + selectedData.entryTpe) +
      (selectedData.date_range != ''
        ? '&date_range=' + selectedData.date_range
        : '') +
      (selectedData.start_date != ''
        ? '&start_date=' + selectedData.start_date
        : '') +
      (selectedData.end_date != '' ? '&end_date=' + selectedData.end_date : '')

    this.reportService.getGraphData(params).subscribe((res) => {
      this.loadingController.dismiss()

      this.totalUser = res
      console.log(this.totalUser)
      console.log(this.totalUser)
      console.log(this.tableData)
      this.dates = this.totalUser.data.dates
      this.entry = this.totalUser.data.entry_count

      // Chart.plugins.register(ChartDataLabels);
      const labels = this.dates

      const myChart = new Chart('myChart', {
        type: 'horizontalBar',
        plugins: [pluginDataLabels],
        data: {
          labels: labels,
          // datalabels:labels,
          datasets: [
            {
              // axis: 'y',
              data: this.entry,
              fill: false,
              // align:'top',

              backgroundColor: [
                ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',

             
              ],

              borderColor: [
                 ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
                  ' rgba(83,101,255,255)',
              ],
              borderWidth: 1,
              // datalabels:{
              //   color: ' blue',
              //   anchor: 'end',
              //   align: 'top',
              //   display: true
              // }
              datalabels: {
                anchor: 'end',
                align: 'end',

                padding: { right: 20 },
              },
            },
          ],
        },

        options: {
          legend: {
            display: false,
          },
          // indexAxis: 'y',

          // plugins:{pluginDataLabels},

          scales: {
            xAxes: [
              {
                position: 'top',
                // borderDash: [8, 4],
                // color: "#348632"
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],

            // xAxes: [
            //   {
            //     position: 'top',
            //     borderDash: [8, 4],
            //     color: "#348632"
            //   },
            // ],
            // yAxes: [
            //   {
            //     gridLines: {
            //       display: false}
            //     ],
            // xAxes: [{
            //   position: "top"
            // }]
          },
        },
      })
      if (this.totalUser.data.dates == '') {
        this.isShown2 = !this.isShown2;
        this.isShown = false;
        document.getElementById('graphView').style.display = 'none'
      } else {
        this.isShown2 = false;
        this.isShown = false;
      }
    })
  }

  one() {
    this.pageNo = 1

    this.checkingSegmentView()
  }
  two() {
    this.pageNo = 2

    this.checkingSegmentView()
  }
  three() {
    this.pageNo = 3

    this.checkingSegmentView()
  }
  four() {
    this.pageNo = 4

    this.checkingSegmentView()
  }
  five() {
    this.pageNo = 5

    this.checkingSegmentView()
  }
  checkingSegmentView() {
    if (this.selectedSegment == 'user_entry_log') {
      if (this.view == false) {
        this.userEntryTable.entryType = 'user_entry_log'
        this.getTableData(this.userEntryTable)
        this.dataSelected = this.userEntryTable
        console.log(this.dataSelected)
      } else {
        this.userEntryGraph.entryType = 'user_entry_log'
        this.getGraphData(this.userEntryGraph)
        this.dataSelected = this.userEntryGraph
      }
    } else if (this.selectedSegment == 'gate_pass') {
      if (this.view == false) {
        this.gatePassTable.entryType = 'gate_pass'
        this.getTableData(this.gatePassTable)
        this.dataSelected = this.gatePassTable
      } else {
        this.gatePassGraph.entryType = 'gate_pass'
        this.getGraphData(this.gatePassGraph)
        this.dataSelected = this.gatePassGraph
      }
    } else {
      if (this.view == false) {
        this.visitorEntryTable.entryType = 'visitor_record'
        this.getTableData(this.visitorEntryTable)
        this.dataSelected = this.visitorEntryTable
      } else {
        this.visitorEntryGraph.entryType = 'visitor_record'
        this.getGraphData(this.visitorEntryGraph)
        this.dataSelected = this.visitorEntryGraph
      }
    }
  }
}
