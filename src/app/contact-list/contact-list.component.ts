import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [ContactService]
})
export class ContactListComponent implements OnInit {
  addingContact = false;
  contacts: any = [];
  selectedContact: Contact;

  constructor(private contactService: ContactService) {}

  schools = ['City','Public','Northview','West','Scenic','Callaway','Truman','Norman','Staten'];
  fnames = ['Eli','Mark','John','Tom','Matt','Jimmy','Jake','Kate','Emily','Mary','Katie','Kelly','Maddy','Renee','Joe','Jackson','Greg','Easton','Weston','Davis','Sally','Yvonne','Susan','Megan','Isaiah','Carl','Carly','Ben','Tina'];
  lnames = ['Lopez','Smith','Carter','Williams','McClain','Stout','Snyder','Klein','Alexander','King','Leonard','Carlson','Fredrickson','Ahren','Taylor','Hill','Schmidt'];
  majors = ['Computer Science','Computer Engineering','Mechanical Engineering','Industrial Engineering','Chemical Engineering', 'Civil Engineering',
            'Electrical Engineering','Environmental Engineering','Construction Science',' Architectural Engineering', 'Biosystems Engineering'];
  states = ['Kansas','Missouri','Nebraska','Iowa','Oklahoma','Colorado','Arkansas','Ohio','California','Maine','Alabama','Minnesota'];
  cities = ['Springfield','Branson','Manhattan','Chesterfield','Raytown','Destin','Lake City','Park City','Townville','Independence','Liberty','Lexington'];
  grades = ['Freshman','Sophomore','Junior','Senior'];
  descriptions = ['Nice','Smart','Personable','Funny','Good','Likable','Friendly'];
  contactAmount = 0;

  ngOnInit() {
   this.getContacts();
  }

  cancel() {
    this.addingContact = false;
    this.selectedContact = null;
  }

  deleteContact(contact: Contact) {
    this.contactService.deleteContact(contact).subscribe(res => {
      this.contacts = this.contacts.filter(h => h !== contact);
      if (this.selectedContact === contact) {
        this.selectedContact = null;
      }
    });
  }

  getContacts() {
    return this.contactService.getContacts().subscribe(contacts => {
      this.contacts = contacts;
    });
  }

  enableAddMode() {
    this.addingContact = true;
    this.selectedContact = new Contact();
  }

  onSelect(contact: Contact) {
    this.addingContact = false;
    this.selectedContact = contact;
  }

  save() {
    if (this.addingContact) {
        this.contactService.addContact(this.selectedContact).subscribe(contact => {
        this.addingContact = false;
        this.selectedContact = null;
        this.contacts.push(contact);
      });
    } else {
      this.contactService.updateContact(this.selectedContact).subscribe(contact => {
        this.addingContact = false;
        this.selectedContact = null;
      });
    }
  }

  populateContacts(){
    for(var i = this.contactAmount; i <= 50; i++){
      let uid = i;
      let school = this.schools[Math.floor(Math.random() * this.schools.length)]; 
      let name = this.fnames[Math.floor(Math.random() * this.fnames.length)].concat(" " + this.lnames[Math.floor(Math.random() * this.lnames.length)]);
      let description = this.descriptions[Math.floor(Math.random() * this.descriptions.length)]; 
      let state = this.states[Math.floor(Math.random() * this.states.length)];
      let city = this.cities[Math.floor(Math.random() * this.cities.length)];
      let grade = this.grades[Math.floor(Math.random() * this.grades.length)];
      let major = this.majors[Math.floor(Math.random() * this.majors.length)];
      let meetings = Math.floor(Math.random() * 9) + 1  
      let populatedContact = new Contact();
      populatedContact.uid = uid;
      populatedContact.state = state;
      populatedContact.name = name;
      populatedContact.highschool = school;
      populatedContact.hometown = city;
      populatedContact.description = description;
      populatedContact.grade = grade;
      populatedContact.meetings = meetings;
      populatedContact.major = major;
      this.contactService.addContact(populatedContact).subscribe(contact => this.contacts.push(contact));
      this.contactAmount = this.contactAmount + 1;
    }
  }


}