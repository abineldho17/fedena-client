import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { Gallery } from 'src/providers/gallery';
import { GalleryModel } from 'src/models/gallery';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  show_albums = [];
  page_number = 0;
  albums = [];
  userId: number;
  router: any;
  studentId: any = '';
  tokenInfo: any;
  albumData: any;
  page: number = 1;
  galleryLastAccessedAt: Date;
  constructor(private http: HttpClient, public loadingController: LoadingController,private route: Router,private galleryService: Gallery) {
  }
  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
  async ngOnInit() {


    const loading = await this.loadingController.create({

      message: 'Loading Images',
      duration: 1000
    });
    await loading.present();

    // console.log('Loading dismissed!');

    this.getData(null);

  }



  // loadAlbums() {
  //   this.galleryService.loadAlbums(this.token, this.page).subscribe(
  //     (response: any) => {


    // getCourse() {
    //   this.attendanceService.getCourse().subscribe(
     
    //     (res: any) => {
  

  getData(event) {
    // console.log(this.page_number);
   this.galleryService.getData(this.page_number).subscribe(
    // this.http.get(" http://fconnect.t.foradian.org/api/galleries?page=" + this.page_number).subscribe(
      (res: any) => {
        console.log(res.albums);
        // this.albumData = new GalleryModel(res);
        // console.log(this.albumData);
        // this.albums = this.albumData.albums;


        res.albums.forEach(i => {
          this.albums.push(new GalleryModel(i));
        });


        if (res.albums && res.albums != null) {
        
          
          // console.log(this.show_albums);
          for (let albums of res.albums) {
            
            // console.log(albums);
            // console.log(albums.id);
            // this.albumData = new GalleryModel(res);
            // console.log(this.albumData);
            // this.albums = this.albumData.albums;
            // this.show_albums.push(albums);
            
           
          }
         

          this.page_number++;
          if (event)
            event.target.complete();

          //this.page_number++;
          
        }
        else {
          event.target.disabled = true;
        }
      
       

      }, error => {
        // console.log(error);
      })
  }


  loadData(event) {
    this.getData(event);
  }

  // openAlbum(id) {
  //   console.log(id);
  //   this.router.navigateByUrl('/albums/' + id)
  // }

  clickedRow(album, i) {
    album["isHighlighted"] = true;
    console.log('clicked');
    console.log(album.id);
    window.localStorage.setItem("album_id", album.id);
    this.route.navigate(['/album']);
  //  this.route.navigateByUrl('/album', { state: { 'photo_index': i, 'images': this.show_albums } });
   
    
  }
}


