import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Editora } from '../models/editora';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditoraService {

  constructor() { }


  http = inject(HttpClient);

  API = "http://localhost:8080/api/editora";


  listAll(): Observable<Editora[]> {
    return this.http.get<Editora[]>(this.API+"/listAll");
  }
  

  save(editora: Editora): Observable<string> {
    return this.http.post<string>(this.API+"/save", editora, {responseType: 'text' as 'json'} );
  }

  
  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'} );
  }


  update(editora: Editora): Observable<string> {
    return this.http.put<string>(this.API+"/update/"+editora.id, editora, {responseType: 'text' as 'json'} );
  }

  findById(id: number): Observable<Editora> {
    return this.http.get<Editora>(this.API+"/findById/"+id );
  }

}
