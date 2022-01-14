import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
loginUserData = {
  
};

  constructor(private _auth: AuthService,private route: Router) {}
ngOnInit() {}



loginUser(){
 
   
  this._auth.loginUser(this.loginUserData)
  .subscribe(
    res => {
      window.localStorage.setItem("access_token", res.token.access_token);
      console.log(res.token.access_token)
      this.route.navigate(['/information']);
    },

    err => console.log(err)
    
  )

    // this.route.navigate(['/information']);
  

}

}

