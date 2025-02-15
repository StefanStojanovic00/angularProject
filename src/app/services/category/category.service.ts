import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../../models/category';
import { environment } from '../../../enviroments/enviroment';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient:HttpClient) { }

  getAll()
  {
    return this.httpClient.get<Category[]>(`${environment.api}/category`);
    
  /* return this.httpClient.get<Category[]>(`${environment.api}/category`).pipe(
    tap(data => console.log('Podaci primljeni sa servera:', data)), // Loguje odgovor API-ja
    catchError(error => {
      console.error('Greška prilikom dohvatanja podataka:', error);
      return throwError(() => error);
    })
  );*/

  }

  create(name: string) {
    return this.httpClient.post<Category>(`${environment.api}/category`, {
      name,
    });
  }

  update(id: string, name: string) {
    return this.httpClient.put<any>(`${environment.api}/category`, {
      id,
      name,
    });
  }

  delete(id: string) {
    return this.httpClient.delete<any>(`${environment.api}/category/${id}`);
  }
}
