import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Chofer } from '../models/chofer'

@Injectable({
  providedIn: 'root'
})
export class ChoferService {

  private url = 'http://localhost:8080/chofer'

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.url)
  }

  save(c: Chofer): Observable<any> {
    return this.http.post(this.url, c)
  }

  delete(id: number): Observable<any> {
    return this.http.post(this.url + '/' + id + '/delete', null)
  }

  update(c: Chofer): Observable<any> {
    return this.http.post(this.url + '/' + c.id + '/update', c)
  }

  setAuto(choferId: number, autoId: number): Observable<any> {
    return this.http.post(this.url + '/' + choferId + '/setAuto', autoId)
  }
}