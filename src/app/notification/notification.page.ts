import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { PopoverComponentComponent } from '../popover-component/popover-component.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  startTime = '';
  endTime = '';


  sTime: any;
  eTime: any;
  public mytime;
  myDate: any;
  time1: any;
  time2: any;
  constructor(public alertController: AlertController, public popoverController: PopoverController) { }

  ngOnInit() {

  }

  async DismissClick() {
    await this.popoverController.dismiss();
  }

  // click(date1,date2){
  //   console.log('click..',date1);
  //   console.log('click..',date2);
  //   // let hoursMinutes = date1.split(':');
  //   // let hoursMinutes2 = date2.split(':');
  //    this.time1 = this.getFormatedTime1(date1);
  //    this.time2 = this.getFormatedTime2(date2);
  //   console.log('time',this.time1);
  //   this.startTime = this.time1;
  //   this.endTime = this.time2;
  //   //  console.log(this.sTime);
  //   //  console.log(this.eTime);
  //   // this.startTime = this.sTime;
  //   // this.endTime = this.eTime;
  //   // console.log(this.startTime);
  //   // console.log(this.endTime)
  //   document.getElementById('hidden').style.display = "block";
  //   this.popoverController.dismiss();



  // }




  click1(date1) {
    console.log('click..', date1);

    this.time1 = this.getFormatedTime1(date1);

    this.startTime = this.time1;

    document.getElementById('hidden').style.display = "block";
    this.popoverController.dismiss();



  }

  click2(date2) {

    console.log('click..', date2);

    this.time2 = this.getFormatedTime2(date2);

    this.endTime = this.time2;

    document.getElementById('hidden').style.display = "block";
    this.popoverController.dismiss();

  }



  getFormatedTime1(date1) {
    var date = new Date(date1);
    var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    var am_pm = date.getHours() >= 12 ? "pm" : "am";
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let time = hours + ":" + minutes + " " + am_pm;
    console.log(time);
    return time;

  }


  getFormatedTime2(date2) {
    var date = new Date(date2);
    var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    var am_pm = date.getHours() >= 12 ? "pm" : "am";
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let time = hours + ":" + minutes + " " + am_pm;
    console.log(time);
    return time;
  }


  // formatAMPM(date) {
  //   var hours = date[0];
  //   var minutes = date[1];
  //   var ampm = hours >= 12 ? 'pm' : 'am';
  //   hours = hours % 12;
  //   hours = hours ? hours : 12;
  //   minutes = minutes < 10 ? '0'+minutes : minutes;
  //   var strTime = hours + ':' + minutes + ' ' + ampm;
  //   return strTime;
  // }

  // formatAMPM2(date2) {
  //   var hours = date2[0];
  //   var minutes = date2[1];
  //   var ampm = hours >= 12 ? 'pm' : 'am';
  //   hours = hours % 12;
  //   hours = hours ? hours : 12;
  //   minutes = minutes < 10 ? '0'+minutes : minutes;
  //   var strTime = hours + ':' + minutes + ' ' + ampm;
  //   return strTime;
  // }

  start1() {
    document.getElementById('trigger-button1').click();


  }

  start2() {

    document.getElementById('trigger-button2').click();

  }




  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Select Time',
      inputs: [


        {
          name: 'time1',
          type: 'time',


        },

        {
          name: 'time2',
          type: 'time'
        },


      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (alertData) => {
            console.log(alertData.time1);
            this.sTime = alertData.time1;
            this.eTime = alertData.time2;

            this.startTime = this.sTime;
            this.endTime = this.eTime;
            document.getElementById('hidden').style.display = "block";
          }
        }
      ]
    });

    await alert.present();
  }

}
