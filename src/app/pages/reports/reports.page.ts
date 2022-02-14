import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { AppSettings } from 'src/providers/app-settings'
import {  Router } from '@angular/router'
import { Reports } from 'src/providers/reports'
import { LoadingController, ModalController } from '@ionic/angular'

import { FilterReportsPage } from 'src/app/filter-reports/filter-reports.page'
import * as Chart from 'chart.js'
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { default as pluginDataLabels  } from 'chartjs-plugin-datalabels';

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
  view: boolean = true

  selectedSegment: string = 'user_entry_log'
  private selectedView: string = 'tableView'
  myChart: any
  totalUser: any
  tableData: []

  graphUser: any
  graphData: []

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
 
  public columns: any;
  public rows: any;
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
      componentProps: {
        selectedVal: this.dataSelected,
      },
    })

    modal.onDidDismiss().then((res) => {
      console.log(res)
      if (res.data != undefined) {
        if (this.selectedSegment == 'user_entry_log') {
          if (this.view == true) {
            this.userEntryTable = res.data
          } else {
            this.fetchLocation = 'user_entry_log_graph'
            this.userEntryGraph = res.data
          }
        } else if (this.selectedSegment == 'gate_pass') {
          if (this.view == true) {
            // this.fetchLocation = 'gate_pass_table'
            this.gatePassTable = res.data
          } else {
            this.fetchLocation = 'gate_pass_graph'
            this.gatePassGraph = res.data
          }
        } else {
          if (this.view == true) {
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
      'entry_type=' +
      selectedData.entryTpe +
      (selectedData.date_range != ''
        ? '&date_range=' + selectedData.date_range
        : '') +
      (selectedData.start_date != ''
        ? '&start_date=' + selectedData.start_date
        : '') +
      (selectedData.end_date != '' ? '&end_date=' + selectedData.end_date : '')

     

    this.reportService.getTableData(params).subscribe((res) => {
      this.loadingController.dismiss()

      this.totalUser = res
      this.tableData = this.totalUser.data
      console.log(this.tableData);
      
    })
  }

  getGraphData(selectedData) {
    console.log('graph')
    this.presentLoading('loading table data')

    selectedData.entryTpe = this.selectedSegment

    let params =
      'entry_type=' +
      selectedData.entryTpe +
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
      console.log(this.tableData)
      this.dates = this.totalUser.data.dates
      this.entry = this.totalUser.data.entry_count
      // Chart.plugins.register(ChartDataLabels);
      const labels = this.dates;
      // const data = {
      //   labels: labels,
      //   // datalabels:labels,
      //   datasets: [
      //     {
      //       axis: 'y',
      //       data: this.entry,
      //       fill: false,
      //       // align:'top',

      //       backgroundColor: [
      //         'rgba(255, 99, 132, 0.2)',
      //         'rgba(255, 159, 64, 0.2)',
      //         'rgba(255, 205, 86, 0.2)',
      //         'rgba(75, 192, 192, 0.2)',
      //         'rgba(54, 162, 235, 0.2)',
      //         'rgba(153, 102, 255, 0.2)',
      //         'rgba(201, 203, 207, 0.2)',
      //         'rgba(255, 99, 132, 0.2)',
      //         'rgba(255, 159, 64, 0.2)',
      //         'rgba(255, 205, 86, 0.2)',
      //         'rgba(75, 192, 192, 0.2)',
      //         'rgba(54, 162, 235, 0.2)',
      //         'rgba(153, 102, 255, 0.2)',
      //         'rgba(201, 203, 207, 0.2)',
      //         'rgba(255, 99, 132, 0.2)',
      //         'rgba(255, 159, 64, 0.2)',
      //         'rgba(255, 205, 86, 0.2)',
      //         'rgba(75, 192, 192, 0.2)',
      //         'rgba(54, 162, 235, 0.2)',
      //         'rgba(153, 102, 255, 0.2)',
      //         'rgba(201, 203, 207, 0.2)',
      //         'rgba(255, 99, 132, 0.2)',
      //         'rgba(255, 159, 64, 0.2)',
      //         'rgba(255, 205, 86, 0.2)',
      //         'rgba(75, 192, 192, 0.2)',
      //         'rgba(54, 162, 235, 0.2)',
      //         'rgba(153, 102, 255, 0.2)',
      //         'rgba(201, 203, 207, 0.2)',
      //       ],

      //       borderColor: [
      //         'rgba(255, 99, 132, 0.2)',
      //         'rgba(255, 159, 64, 0.2)',
      //         'rgba(255, 205, 86, 0.2)',
      //         'rgba(75, 192, 192, 0.2)',
      //         'rgba(54, 162, 235, 0.2)',
      //         'rgba(153, 102, 255, 0.2)',
      //         'rgba(201, 203, 207, 0.2)',
      //         'rgba(255, 99, 132, 0.2)',
      //         'rgba(255, 159, 64, 0.2)',
      //         'rgba(255, 205, 86, 0.2)',
      //         'rgba(75, 192, 192, 0.2)',
      //         'rgba(54, 162, 235, 0.2)',
      //         'rgba(153, 102, 255, 0.2)',
      //         'rgba(201, 203, 207, 0.2)',
      //       ],
      //       borderWidth: 1,
      //       datalabels:{
      //         color: ' blue',
      //         anchor: 'end',
      //         align: 'top',
      //         display: true
      //       }
      //     },
      //   ],
      // }

      const myChart = new Chart('myChart', {
        type: 'horizontalBar' ,
        plugins:[pluginDataLabels],
        data : {
          labels: labels,
          // datalabels:labels,
          datasets: [
            {
              // axis: 'y',
              data: this.entry,
              fill: false,
              // align:'top',
  
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)',
              ],
  
              borderColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)',
              ],
              borderWidth: 1,
              // datalabels:{
              //   color: ' blue',
              //   anchor: 'end',
              //   align: 'top',
              //   display: true
              // }
              datalabels:{
                anchor: 'end',
                align: 'end',
                
                padding: {right:20 } 
              
              }
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
    })
  }

  checkingSegmentView() {
    if (this.selectedSegment == 'user_entry_log') {
      if (this.view == true) {
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
      if (this.view == true) {
        this.gatePassTable.entryType = 'gate_pass'
        this.getTableData(this.gatePassTable)
        this.dataSelected = this.gatePassTable
      } else {
        this.gatePassGraph.entryType = 'gate_pass'
        this.getGraphData(this.gatePassGraph)
        this.dataSelected = this.gatePassGraph
      }
    } else {
      if (this.view == true) {
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
