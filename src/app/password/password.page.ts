import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Password } from 'src/providers/password';
// import { AuthService } from '../auth.service';

// import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  title = 'off-outline';
  title2 = 'off-outline';
  passwordicon : string = "eye-off";
  passwordicon2 : string = "eye-off";

  login = {
    old_password: '',
    new_password: ''
  };
  loginUserData = {
  
  };
  loading: any;

  constructor(public toastController: ToastController, private route: Router, public loadingController: LoadingController,private passwordService: Password,public alertController: AlertController) { }

  ngOnInit() {
    
  }
  showPassword(input: any): any {
    // this.title = 'outline';
    input.type = input.type === 'password' ? 'text' : 'password';
this.passwordicon = this.passwordicon === 'eye-off' ? 'eye' : 'eye-off';

  }

  showPassword2(input: any): any {
    // this.title2 = 'outline';
    input.type = input.type === 'password' ? 'text' : 'password';
    this.passwordicon2 = this.passwordicon2 === 'eye-off' ? 'eye' : 'eye-off';

  }





  async presentToast(message : string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }


  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'please wait',
       duration: 2000
    });
    return this.loading.present();
    // const { role, data } = await loading.onDidDismiss();

    // console.log('Loading dismissed!');

  }


  // async presentAlert() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Alert',
  //     message: 'Current Password is wrong',
  //     buttons: ['OK']
  //   });

  //   await alert.present();

    
  // }


  reset() {
      this.presentLoading();
    this.passwordService.reset(this.login).subscribe(
   
      (res: any) => {
                 
// // console.log(res.description);

//         window.localStorage.setItem("access_token", res.token.access_token);
//         this.route.navigate(['/information']);
             
// // console.log(res.description);
//         return this.presentLoading();





        if(res.description != 'invalid_username_or_password'){
          this.loading.dismiss();
          this.presentToast('Password Reset');
          window.localStorage.setItem("access_token", res.token.access_token);
          
          this.route.navigate(['/information']);
        

          
          

        }
        else{
          this.loading.dismiss();
          this.presentToast('Current password is wrong');
          
        }
   
      },
      
       error => {
        // return this.presentAlert() ;
       
        
      })
     
  }




  showtrial() {

    const dp1 = this.login.old_password;

    const dp2 = this.login.new_password;
    if (dp1 == dp2) {
     
      return this.presentToast('Current password and new password must not be same');
    }
    // else if (this.login.old_password == window.localStorage.getItem("oldpassword")) {
    //   // return this.presentAlert() ;
    //   return this.reset();
    // } 
    else {
     
      return this.reset();
      // return this.presentAlert() ;
      
    }
  }





  //  const dp1 = this.login.currentpassword;

  //  const dp2 = this.login.newpassword;



  //     if(dp1==dp2){
  //       const loading = await this.loadingController.create({
  //         message: 'Please wait...',
  //         duration: 2000
  //       });
  //       await loading.present();


  //     }
  //     else{

  // console.log("clikkk");
  //       const toast = await this.toastController.create({
  //         message: 'current password and new password must be same',
  //         duration: 2000
  //       });
  //       toast.present();
  //     }






  //    async presentToast() {

  //    const dp1 = this.login.currentpassword;
  //    console.log(dp1);

  //    const dp2 = this.login.newpassword;
  //    console.log(dp2);



  //     if(dp1==dp2){
  //       const loading = await this.loadingController.create({
  //         message: 'Please wait...',
  //         duration: 2000
  //       });
  //       await loading.present();


  //     }
  //     else{

  // console.log("clikkk");
  //       const toast = await this.toastController.create({
  //         message: 'current password and new password must be same',
  //         duration: 2000
  //       });
  //       toast.present();
  //     }



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





