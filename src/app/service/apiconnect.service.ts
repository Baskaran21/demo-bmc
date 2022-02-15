import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIconnectService {

  private selectedEmp = new BehaviorSubject('');
  getEmp = this.selectedEmp.asObservable();

  constructor(private http: HttpClient) { }

  setEmp(value: any) {
    this.selectedEmp.next(value);
  }

  ApiURL = "https://ca-assignment.azurewebsites.net/api/v2/employee";

  createEmp(reqBody: any) {
    let headers = new HttpHeaders({
      'content-type': 'application/json'
    });

    let options = {
      headers: headers
    };
    return this.http.post(this.ApiURL, reqBody, options)
  }

  getAllEmp() {
    let headers = new HttpHeaders({
      'content-type': 'application/json'
    });

    let options = {
      headers: headers
    };
    return this.http.get(this.ApiURL, options)
  }

  updateEmp(id: any, reqBody: any) {
    let headers = new HttpHeaders({
      'content-type': 'application/json'
    });

    let options = {
      headers: headers
    };
    return this.http.put(this.ApiURL + '/' + id, reqBody, options)
  }

  deleteEmp(id: any) {
    let headers = new HttpHeaders({
      'content-type': 'application/json'
    });

    let options = {
      headers: headers
    };
    return this.http.delete(this.ApiURL + '/' + id, options)
  }
}
