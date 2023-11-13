import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Auto } from '../models/auto'

@Injectable({
  providedIn: 'root'
})
export class AutoService {

  private url = 'http://localhost:8080/auto'

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.url)
  }

  save(a: Auto): Observable<any> {
    return this.http.post(this.url, a)
  }

  update(a: Auto): Observable<any> {
    return this.http.post(this.url + '/' + a.id + '/update', a)
  }

  delete(id: number): Observable<any> {
    return this.http.post(this.url + '/' + id + '/delete', null)
  }

  setViaje(autoId: number, viajeId: number): Observable<any> {
    return this.http.post(this.url + '/' + autoId + '/setViaje', viajeId)
  }
}