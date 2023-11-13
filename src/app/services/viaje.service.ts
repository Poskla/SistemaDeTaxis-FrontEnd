import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Viaje } from '../models/viaje'
 
@Injectable({
  providedIn: 'root'
})
export class ViajeService {
 
  private url = 'http://localhost:8080/viaje'
 
  constructor(private http: HttpClient) { }
 
  getAll(): Observable<any> {
    return this.http.get(this.url)
  }
 
  save(v: Viaje): Observable<any> {
    return this.http.post(this.url, v)
  }
 
  delete(id: number): Observable<any> {
    return this.http.post(this.url + '/' + id + '/delete', null)
  }
 
  update(v: Viaje): Observable<any> {
    return this.http.post(this.url + '/' + v.id + '/update', v)
  }

  setAuto(autoId: number, viajeId: number): Observable<any> {
    return this.http.post(this.url + '/' + autoId + '/setViaje', viajeId)
  }
}