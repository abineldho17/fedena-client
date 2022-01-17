import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor( private route: Router,public menuCtrl: MenuController) {}
 


  logout() {
    this.route.navigate(['/home']);
    this.menuCtrl.toggle();
  }
  changepassword() {
    this.route.navigate(['/password']);
    this.menuCtrl.toggle();
  }
}
