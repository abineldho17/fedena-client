import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Readmore } from 'src/providers/readmore';
import { ReadmoreModel} from 'src/models/readmore'
import { AnnouncementModel } from 'src/models/announcement';
@Component({
  selector: 'app-readmore',
  templateUrl: './readmore.page.html',
  styleUrls: ['./readmore.page.scss'],
})
export class ReadmorePage implements OnInit {
  full_detail = [];
  news: any = {};
  readData: any;
  readmore = [];
 
  constructor(private http: HttpClient,private readmoreService: Readmore) { 
    
  }

  ngOnInit() {

          console.log(window.localStorage.getItem("id"));
          this.readmoreService.getData().subscribe(
      (res: any) => {

        this.readData= new ReadmoreModel(res.news);
        console.log(this.readData);
        this.readmore = this.readData.news;
       
        // this.readmore = this.readData.news;
      
    //  this.readData = new ReadmoreModel(res);
    //  console.log(this.readData);
    // this.news = new ReadmoreModel(res.news);
    // console.log(this.news);

        if (res.news && res.news != null) {
        
          // res.news.forEach(i => {
          //   this.readData.push(new ReadmoreModel(i));
          // });
          
        
           this.readmore = this.readData.news;
             this.full_detail.push(res.news);
            
           
          }
         
          // console.log(this.full_detail);
       
       

      }, error => {
        console.log(error);
      })
  }
  
  

}
