import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  LoginUser, RegisterUser, User } from '../../models/user';
import { environment } from '../../../enviroments/enviroment';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient:HttpClient){}

  login(email:string,password:string)
  {
    console.log('Sending login request to server');
    return this.httpClient.post<LoginUser>(`${environment.api}/user/login`, {
      email,
      password,
    });
    
  }
  register(data: RegisterUser) {
    return this.httpClient.post<User>(`${environment.api}/user/register`, {
      ...data,
    });
  }
  toggleSave(adId: number) {
    return this.httpClient.get<any>(`${environment.api}/user/toggleSave/${adId}`);
  }

  editProfil(user:FormData)
  {

    return this.httpClient.put<User>(`${environment.api}/user/edit-profil/`, user);
  
  }
}
