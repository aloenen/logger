import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from './event';

const api = '/api';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getEvents(){
    return this.http.get<Array<Event>>(`${api}/events`);
  }

  deleteEvent(event: Event) {
    return this.http.delete(`${api}/event/${event.uid}`);
  }

  addEvent(event: Event) {
    return this.http.post<Event>(`${api}/event/`, event);
  }

}
