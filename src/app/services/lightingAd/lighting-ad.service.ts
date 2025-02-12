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
  getByUser() {
    return this.httpClient.get<lightingAd[]>(`${environment.api}/lighting-ad/myAds`);
  }
  create(formData: FormData) {
    return this.httpClient.post<lightingAd[]>(`${environment.api}/lighting-ad`, formData);
  }
  delete(id:number)
  {
    return this.httpClient.delete<any>(`${environment.api}/lighting-ad/${id}`);
  }

  getOne(id: number) {
    return this.httpClient.get<lightingAd>(`${environment.api}/lighting-ad/${id}`);
  }
  getByUserSaved() {
    return this.httpClient.get<lightingAd[]>(`${environment.api}/lighting-ad/savedAds`);
  }

  getBySearch(input:string,categoryId:string)
  {
    return this.httpClient.get<lightingAd[]>(`${environment.api}/lighting-ad/search?categoryId=${categoryId}&searchInput=${input}`) 
  }

  update(formData:FormData)
  {
    return this.httpClient.put<lightingAd>(`${environment.api}/lighting-ad/`, formData);
  }

  adminDelete(id:number)
  {
    return this.httpClient.patch<any>(`${environment.api}/lighting-ad/softDelete/`,{
      id:id,
    });
  
  }

}
