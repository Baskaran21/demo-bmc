import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  viewPage: boolean = false;
  constructor(private route: Router,
    private spinner: NgxSpinnerService) {
  }

  view(): void {
    this.viewPage = true;
    this.route.navigate(['view']);
  }

}
