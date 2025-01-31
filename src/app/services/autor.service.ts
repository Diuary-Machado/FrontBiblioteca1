import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Autor } from '../models/autor';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  constructor() { }

  
  http = inject(HttpClient);

  API = "http://localhost:8080/api/autor";


  listAll(): Observable<Autor[]> {
    return this.http.get<Autor[]>(this.API+"/listAll");
  }
  

  save(autor: Autor): Observable<string> {
    return this.http.post<string>(this.API+"/save", autor, {responseType: 'text' as 'json'} );
  }

  
  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'} );
  }


  update(autor: Autor): Observable<string> {
    return this.http.put<string>(this.API+"/update/"+autor.id, autor, {responseType: 'text' as 'json'} );
  }

  findById(id: number): Observable<Autor> {
    return this.http.get<Autor>(this.API+"/findById/"+id );
  }


}
