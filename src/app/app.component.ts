import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src (copy)/app/auth.service';
import { TranslateConfigService } from './translate-config.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  selectedLanguage: string;
  constructor( public menuCtrl: MenuController,private _auth: AuthService,private route: Router,public alertController: AlertController,private translateConfigService: TranslateConfigService, private translate: TranslateService,public modalController: ModalController) {
    // this.presentAlertRadio();
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
  }
 


  logout() {
    this.route.navigate(['/home']);
    this.menuCtrl.toggle();
  }

  report() {
    this.route.navigate(['/reports']);
    this.menuCtrl.toggle();
  }
  changepassword() {
    this.route.navigate(['/password']);
    this.menuCtrl.toggle();
  }

 nof() {
    this.route.navigate(['/notification']);
    this.menuCtrl.toggle();
  }



  async presentAlertRadio() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Select your preferred language',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'English',
          value: 'en',
          handler: () => {
            console.log('Radio 1 selected');
            
          },
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Arabic',
          value: 'ar',
          handler: () => {
            console.log('Radio 2 selected');
          }
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
          
            handler: (data:string) => {
              console.log(data); //this should the selected value
          this.selectedLanguage = data;
          console.log(this.selectedLanguage);
          this.translateConfigService.setLanguage(this.selectedLanguage);
          window.localStorage.setItem("language", this.selectedLanguage);
          
          this.menuCtrl.toggle();


            // console.log(this.selectedLanguage)
          }
        }
      ]
    });

    await alert.present();
  }


}
