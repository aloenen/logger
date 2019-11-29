import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  contacts = [
    {id: 1, name: "Andrew Loenen", description: "Senior | Computer Science", email: "c001@email.com"},
    {id: 2, name: "Robert Wasinger", description: "Junior | Industrial Engineering", email: "c002@email.com"},
    {id: 3, name: "Trey Schmidt", description: "Senior | Computer Engineering", email: "c003@email.com"},
    {id: 4, name: "William Carter", description: "Senior | Computer Science", email: "c004@email.com"}
  ];

  constructor() { }

  public getContacts():Array<{id, name, description, email}>{
    return this.contacts;
  }
  public createContact(contact: {id, name, description, email}){
    this.contacts.push(contact);
  }
}
