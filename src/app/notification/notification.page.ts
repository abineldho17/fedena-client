import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
 startTime = '';
 endTime = '';
  // startTime = window.localStorage.getItem("start");
  sTime : any;
  eTime:any;
  constructor(public alertController: AlertController) { }

  ngOnInit() {
    this.startTime = this.sTime;
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
            // window.localStorage.setItem("start",alertData.time1);
            // window.localStorage.setItem("end",alertData.time2);
            // console.log(alertData.time2);
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
