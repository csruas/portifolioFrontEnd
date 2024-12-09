import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Carro } from '../models/carro';
import { Observable } from 'rxjs';
import { Marca } from '../models/marcas';
import { Acessorio } from '../models/acessorio';

@Injectable({
  providedIn: 'root'
})
export class AcessorioService {

  http = inject(HttpClient)

  API = "http://localhost:8080/api/acessorio";

  constructor() { }

  findAll(): Observable<Acessorio []>{
    return this.http.get<Acessorio[]>(this.API+"/findAll")
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
