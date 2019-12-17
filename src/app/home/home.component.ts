import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { EventService } from '../event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  contacts = [];
  events = [];
  numOfContacts = 0;
  numOfEvents = 0;

  constructor(private contactService: ContactService,
              private eventService: EventService){}

  ngOnInit() {
    this.getContacts();
    this.getEvents();
  }

  getContacts() {
    return this.contactService.getContacts().subscribe(contacts => {
      this.contacts = contacts;
      this.numOfContacts = this.contacts.length;
    });
  }

  getEvents(){
    return this.eventService.getEvents().subscribe(events => {
      this.events = events;
      this.numOfEvents = this.events.length;
    });
  }

}




 

