import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { APIconnectService } from 'src/app/service/apiconnect.service';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  employees: any;
  searchedKeyword: string;
  constructor(private route: Router,
    private api: APIconnectService,
    private spinner: NgxSpinnerService) {
    this.searchedKeyword = '';
  }

  ngOnInit(): void {
    this.spinner.show();
    this.api.getAllEmp().subscribe((res: any) => {
      console.log(res);
      this.employees = res;
      this.spinner.hide();
    });
  }

  addUser(): void {
    this.route.navigate(['create']);
  }

  deleteUser(employee: any) {
    this.spinner.show();
    this.api.deleteEmp(employee.id).subscribe((res: any) => {
      console.log(res);
      this.ngOnInit();
    });
  }

  editUser(employee: any) {
    this.api.setEmp(employee);
    this.route.navigate(['create'], { queryParams: { type: 'edit' } });
  }
}
