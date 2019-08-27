import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { Client } from '../models/client';
import { map, tap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ClientService {

  readonly url = 'http://localhost:3000/clients';
  private clientsSubject$: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>(null);
  private loaded: boolean = false;

  constructor(
    private http: HttpClient) {}

  get(): Observable<Client[]> {
    if (!this.loaded) {
      combineLatest(
        this.http.get<Client[]>(this.url))
      .pipe(
        tap(([clients]) => console.log(clients)),
        filter(([clients])=> clients != null),
        map(([clients])=> {
          return clients;
        }),
        tap((clients) => console.log(clients))
      )
      .subscribe(this.clientsSubject$);

      this.loaded = true;
    }
    return this.clientsSubject$.asObservable();
  }

  add(cl: Client): Observable<Client> {
    return this.http.post<Client>(this.url, {...cl})
      .pipe(
        tap((c) => {
          this.clientsSubject$.getValue()
            .push({...cl, _id: c._id})
        })
      )
  }

  del(cl: Client): Observable<any> {
    return this.http.delete(`${this.url}/${cl._id}`)
      .pipe(
        tap(() => {
          let clients = this.clientsSubject$.getValue();
          let i = clients.findIndex(c => c._id === cl._id);
          if (i>=0)
            clients.splice(i, 1);
        })
      )
  }

  update(cl: Client): Observable<Client> {
    return this.http.patch<Client>(`${this.url}/${cl._id}`, {...cl})
    .pipe(
      tap(() => {
        let clients = this.clientsSubject$.getValue();
        let i = clients.findIndex(c => c._id === cl._id);
        if (i >= 0)
          clients[i] = cl;
      })
    )
  }

}
