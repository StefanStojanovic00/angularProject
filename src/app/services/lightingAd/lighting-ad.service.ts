import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { lightingAd } from '../../models/lighting-ad';

@Injectable({
  providedIn: 'root'
})
export class LightingAdService {

  constructor(private httpClient:HttpClient) { }

  getAll()
  {
    return this.httpClient.get<lightingAd[]>(`${environment.api}/lighting-ad`);
  }
  create(formData: FormData) {
    return this.httpClient.post<any>(`${environment.api}/lighting-ad`, formData);
  }
}
