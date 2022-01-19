import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {

  constructor(private route: Router) { }

  announcement() {
    this.route.navigate(['/details']);
  }

  attendance() {
    this.route.navigate(['/attendance']);
  }
  gallery(){
    this.route.navigate(['/gallery']);
  }
  ngOnInit() {
  }

}
