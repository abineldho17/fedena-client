import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  login = {
  currentpassword: '',
      newpassword: ''
  };
  
  constructor(public toastController: ToastController,private route: Router,public loadingController: LoadingController) { }

  ngOnInit() {
   
  }
  showPassword(input: any): any {
    input.type = input.type === 'password' ?  'text' : 'password';
   
   }





   async presentToast() {

   const dp1 = this.login.currentpassword;
   console.log(dp1);

   const dp2 = this.login.newpassword;
   console.log(dp2);



    if(dp1==dp2){
      const loading = await this.loadingController.create({
        message: 'Please wait...',
        duration: 2000
      });
      await loading.present();
  
      
    }
    else{

console.log("clikkk");
      const toast = await this.toastController.create({
        message: 'current password and new password must be same',
        duration: 2000
      });
      toast.present();
    }



    // const toast = await this.toastController.create({
    //   message: 'current password and new password must be same',
    //   duration: 2000
    // });
    // toast.present();
  }

  // verifypassword(){
  //   var currentpassword = document.getElementById("currentpassword");
  //   var newpassword = document.getElementById("newpassword");

  // }


  // password(ngForm: NgModel) {
  //   const currentpassword  = document.getElementById('currentpassword');
  //   const { value: newpassword } = formGroup.get('newpassword');
  //   return currentpassword === newpassword ? null : { passwordNotMatch: true };
  // }





}
