import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Carro } from '../models/carro';
import { Observable } from 'rxjs';
import { Marca } from '../models/marcas';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  http = inject(HttpClient)

  API = "http://localhost:8080/api/marcas";

  constructor() { }

  findAll(): Observable<Marca []>{
    return this.http.get<Marca[]>(this.API+"/findAll")
  }

  update(marca: Marca, id: number): Observable<String>{
    return this.http.put<String>(this.API+"/update/"+ id, marca, {responseType: 'text' as 'json'})
  }

  delete(id: number): Observable<String>{
    return this.http.delete<String>(this.API+"/delete/"+ id, {responseType: 'text' as 'json'})
  }

  save(marca: Marca): Observable<String>{
    return this.http.post<String>(this.API+"/save", marca, {responseType: 'text' as 'json'})
  }

  findById(id: number): Observable<Marca>{
    return this.http.get<Marca>(this.API+"/findById/"+ id)
  }
}
