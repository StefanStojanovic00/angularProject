import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  LoginUser } from '../models/user';
import { environment } from '../../enviroments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient:HttpClient){}

  login(email:string,password:string)
  {
    return this.httpClient.post<LoginUser>(`${environment.api}/users/login`, {
      email,
      password,
    });
  }
}
