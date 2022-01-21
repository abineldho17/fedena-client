import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src (copy)/app/auth.service';
import { TranslateConfigService } from '../translate-config.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {


  selectedLanguage:string;
  constructor(public modalController: ModalController,private _auth: AuthService,private route: Router,public alertController: AlertController,private translateConfigService: TranslateConfigService, private translate: TranslateService
) {this.selectedLanguage = this.translateConfigService.getDefaultLanguage(); }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    // this.modalController.dismiss({
    //   'dismissed': true
    // });
  }
ngOnInit() {
// this.presentAlertRadio()
return this.languageChanged();
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
this.modalController.dismiss({
  'dismissed': true
});
}

}
