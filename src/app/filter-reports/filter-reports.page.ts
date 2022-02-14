import { DatePipe } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AlertController, ModalController } from '@ionic/angular'
import { TranslateService } from '@ngx-translate/core'
import { AuthService } from 'src (copy)/app/auth.service'
import { TranslateConfigService } from '../translate-config.service'

@Component({
  selector: 'app-filter-reports',
  templateUrl: './filter-reports.page.html',
  styleUrls: ['./filter-reports.page.scss'],
})
export class FilterReportsPage implements OnInit {
  @Input() selectedVal: any

  user = {
    daterange: '',
  }
  val: string
  view: boolean = true
  selectedValue = 'Default'
  variable: any
  startDate: any
  endDate: any

  filterData = {
    date_range: '',
    start_date: '',
    end_date: '',
  }
  isSubmitBtnDisabled: boolean
  disableButtonMode: boolean = true
  constructor(
    public modalController: ModalController,
    public alertController: AlertController,
    public datepipe: DatePipe,
  ) {}

  ngOnInit() {
    console.log(this.selectedVal)
    this.filterData = this.selectedVal
    this.user.daterange = this.filterData.date_range
    this.startDate = this.filterData.start_date
    this.endDate = this.filterData.end_date
  }

  clearfilter() {
    console.log('clicked')
    this.user.daterange = ''
    this.filterData.start_date = ''
    this.filterData.end_date = ''
  }

  dismiss() {
    this.modalController.dismiss()
  }

  apply() {
    this.filterData.date_range = this.user.daterange
    console.log(this.filterData.date_range)
    if (this.user.daterange == 'custom') {
      this.filterData.start_date = this.datepipe.transform(
        this.startDate,
        'yyyy-MM-dd',
      )
      this.filterData.end_date = this.datepipe.transform(
        this.endDate,
        'yyyy-MM-dd',
      )

      this.modalController.dismiss(this.filterData)
    } else {
      this.modalController.dismiss(this.filterData)
    }
  }
}
