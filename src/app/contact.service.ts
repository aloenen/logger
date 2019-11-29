import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from './contact';

const api = '/api';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient) {}

  getContacts() {
    return this.http.get<Array<Contact>>(`${api}/contacts`)
  }

  deleteContact(contact: Contact) {
    return this.http.delete(`${api}/contact/${contact.uid}`);
  }

  addContact(contact: Contact) {
    return this.http.post<Contact>(`${api}/contact/`, contact);
  }

  updateContact(contact: Contact) {
    return this.http.put<Contact>(`${api}/contact/${contact.uid}`, contact);
  }
}