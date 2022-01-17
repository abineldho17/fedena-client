import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonInfiniteScroll } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Details } from 'src/providers/details';
import {AnnouncementModel} from 'src/models/announcement'
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  news: AnnouncementModel;
  show_detail = [];
  page_number = 0;
  userId: number;
  newsData: any;
  announcement = [];
  announcementData: any;
  

  constructor(private http: HttpClient, private route: Router, public loadingController: LoadingController,private detailsService: Details) {
  }
  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
  async ngOnInit() {


    const loading = await this.loadingController.create({

      message: 'Loading Announcement',
      duration: 1000
    });
    await loading.present();

    console.log('Loading dismissed!');

    this.getData(null);

  }

  readMore() {
    this.route.navigate(['/readmore']);
  }

  getData(event) {
    // console.log(this.page_number);
   this.detailsService.getData(this.page_number).subscribe(
      (res: any) => {
        
       
        if (res.news && res.news != null) {

            res.news.forEach(i => {
              this.announcement.push(new AnnouncementModel(i));
            });



          // this.announcementData = new AnnouncementModel(res);
          // this.announcement = this.announcementData.news;
          
          // console.log(this.show_detail);
          for (let news of res.news) {
            news["isHighlighted"] = false;
            console.log(news);
            // console.log(news.id);
            // this.newsData = new AnnouncementModel(res);
            // this.news = this.newsData.news;
            
            // this.show_detail.push(news);
           
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
        console.log(error);
      })
  }

  clickedRow(announcement, i) {
    announcement["isHighlighted"] = true;
    console.log('clicked');
    console.log(announcement.id);
    window.localStorage.setItem("id", announcement.id);
    this.route.navigate(['/readmore']);
   
    
  }

  loadData(event) {
    this.getData(event);
  }




  strip(html: string) {

    return html.replace(/<[^>]+>/ig, '').substring(0, 145);


  }
}


