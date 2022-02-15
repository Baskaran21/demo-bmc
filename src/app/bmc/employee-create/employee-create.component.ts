import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { APIconnectService } from 'src/app/service/apiconnect.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  editFlag: boolean = false;
  selectedEmp: any;
  private subs: Subscription[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private api: APIconnectService,
    private actRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  createForm!: FormGroup;

  ngOnInit(): void {
    this.spinner.show();
    this.subs.push(this.api.getEmp.subscribe((value: any) => {
      console.log(value);
      this.selectedEmp = value;
    }));

    this.actRoute.queryParams.subscribe((params: any) => {
      let type = params['type'];
      console.log(type);
      if (type == 'edit') {
        this.editFlag = true;
      }
      this.setForm();
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  setForm() {
    console.log(this.editFlag, 'edit flag');
    if (this.editFlag) {
      console.log('set form edit');
      this.createForm = this.formBuilder.group({
        firstname: [this.selectedEmp.firstname, Validators.required],
        lastname: [this.selectedEmp.lastname, Validators.required],
        age: [this.selectedEmp.age, Validators.required],
        salary: [this.selectedEmp.salary, Validators.required],
        department: [this.selectedEmp.department, Validators.required]
      });
    } else {
      this.createForm = this.formBuilder.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        age: ['', Validators.required],
        salary: ['', Validators.required],
        department: ['', Validators.required]
      });
    }
  }

  submitForm() {
    console.log(this.createForm.value);
    if (this.editFlag) {
      this.api.updateEmp(this.selectedEmp.id, this.createForm.value).subscribe((res: any) => {
        console.log(res);
        this.route.navigate(['view']);
      });
    } else {
      this.api.createEmp(this.createForm.value).subscribe((res: any) => {
        console.log(res);
        this.route.navigate(['view']);
      });
    }

  }
  back() {
    this.route.navigate(['view']);
  }
  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
