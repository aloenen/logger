import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const api = '/api';

@Injectable({
  providedIn: 'root'
})
export class GcalService {

  constructor(private http: HttpClient) { }


}
