import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { Album } from 'src/providers/album';
import { AlbumModel, PhotosModel } from 'src/models/album';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit {

 

@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
full_image = [];
page_number = 1;
userId: number;
router: any;

images = [];
albumId = '';
albumTitle = '';
totalImages = '';
albumData: any;
page: number = 1;
token = '';

constructor(private http: HttpClient,private albumService: Album, public loadingController: LoadingController,private route: Router) {
}



async ngOnInit() {


  const loading = await this.loadingController.create({

    message: 'Loading Images',
    duration: 1000
  });
  await loading.present();


  this.getData(null);
  

}

getData(event) {
  // console.log(this.page_number);
 this.albumService.getData(this.page_number).subscribe(
    (res: any) => {
      
     console.log(res);
      if (res.photos && res.photos != null) {
      
        
         console.log(res);
        for (let photos of res.photos) {
          
            console.log(photos);
          console.log(photos.id);
          this.albumData = new AlbumModel(res);
          this.images = this.albumData.photos;
        
           this.full_image.push(photos);
         
         }
       

      }
     
     

    }, error => {
      console.log(error);
    })
}

openPhoto(index) {
  //this.route.navigate('/light-box', { state: { 'photo_index': index, 'images': this.full_image } });
  this.route.navigateByUrl('/light-box', { state: { 'photo_index': index, 'images': this.images } });
  console.log('clikced');
}
clickedRow(album, i) {
  album["isHighlighted"] = true;
  console.log('clicked');
  console.log(album.id);
  window.localStorage.setItem("id", album.id);
  this.route.navigate(['/album']);
 
  
}
}


