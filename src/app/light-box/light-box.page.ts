import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-light-box',
  templateUrl: './light-box.page.html',
  styleUrls: ['./light-box.page.scss'],
})
export class LightBoxPage implements OnInit {
  images = [];
  constructor( private router: Router) {
    this.images = this.router.getCurrentNavigation().extras.state.images;
      //  console.log(this.full_image);
   }

  ngOnInit() {
  }

 }
// @ViewChild('slider', { static: true }) ionSlides: IonSlides;
//   openAtIndex: number;
//   selectedCaption: string;
//   images = [];
//   constructor(public navCtrl: NavController,
//    // private statusBar: StatusBar,
//     private router: Router) {
//     // this.statusBar.overlaysWebView(false);
//     // this.statusBar.backgroundColorByName('black');
//     this.openAtIndex = this.router.getCurrentNavigation().extras.state.photo_index;
//     this.images = this.router.getCurrentNavigation().extras.state.images;
//     console.log(this.images);
//     this.selectedCaption = this.images[this.openAtIndex].description;
//   }

//   ngOnInit() {
//   }
//   slidechange(event) {
//     console.log(event, 'event');
//     this.ionSlides.getActiveIndex().then((res) => {
//       this.selectedCaption = this.images[res].description;
//     })
//   }
// }
