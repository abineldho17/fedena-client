import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateConfigService } from '../../translate-config.service';
// import {TranslatorPipe} from '../../translator'
import { AuthService } from '../../auth.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalPage } from 'src/app/modal/modal.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
loginUserData = {
  
};
selectedLanguage:string;
  x: any;

  constructor(private _auth: AuthService,private route: Router,public alertController: AlertController,private translateConfigService: TranslateConfigService, private translate: TranslateService,public modalController: ModalController) 
  {
    // window.localStorage.getItem("language") ;
    this.presentAlertRadio();
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
  }
ngOnInit() {
  // this.presentAlertRadio()
  return this.languageChanged();
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
          



            // console.log(this.selectedLanguage)
          }
        }
      ]
    });

    await alert.present();
  }

































































lang(){
 var x = document.getElementById('trial');
 if (x.style.display === "none") {
  x.style.display = "block";
  this.languageChanged();
} else {
  x.style.display = "none";
}
}

async presentModal() {
  const modal = await this.modalController.create({
    component: ModalPage,
    cssClass: 'my-custom-class'
  });
  return await modal.present();
}

languageChanged(){
  this.translateConfigService.setLanguage(this.selectedLanguage);
  window.localStorage.setItem("language", this.selectedLanguage);
}

// async presentAlertRadio() {
//   const alert = await this.alertController.create({
   
//     header: 'Select your preferred language',
//     inputs: [
//       {
//         name: 'English',
//         type: 'radio',
//         label: 'English',
//         value: 'en',
//         // handler: data => {
//         //   console.log('Radio 1 selected', data);
//         // },
//         checked: true
//       },
//       {
//         name: 'Arabic',
//         type: 'radio',
//         label: 'Arabic',
//         value: 'ar',
//         // handler: data=> {
//         //   console.log('Radio 2 selected', data);
//         // }
//       },
      
//     ],
//     buttons: [
//       {
//         text: 'Cancel',
//         role: 'cancel',
//         cssClass: 'secondary',
//         handler: () => {
//           console.log('Confirm Cancel');
//         }
//       }, {
//         text: 'Ok',
//         handler: (data) => {
//           console.log('Confirm Ok',data);
//           this.x = data;
//           console.log(this.x)
//         }
//       }
//     ]
//   });

//   await alert.present();
// }

loginUser(){
 
   
  this._auth.loginUser(this.loginUserData)
  .subscribe(
    res => {
      // res.token.password_reset_required = true;
      
      //   this.route.navigate(['/password']);
      
      // console.log(res.token.password_reset_required);
      window.localStorage.setItem("access_token", res.token.access_token);
      // console.log(res.token.access_token)

      res.token.password_reset_required = true;
      
      if( res.token.password_reset_required == true)
      {

     return this.route.navigate(['/password']);
    
      }
else{

      return this.route.navigate(['/information']);
}
    },

    err => console.log(err)
    
  )

    // this.route.navigate(['/information']);
  

}

}

