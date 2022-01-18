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
      // res.token.password_reset_required = true;
      
      //   this.route.navigate(['/password']);
      
      // console.log(res.token.password_reset_required);
      window.localStorage.setItem("access_token", res.token.access_token);
      // console.log(res.token.access_token)

      res.token.password_reset_required = true;
      
      if( res.token.password_reset_required = true)
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

