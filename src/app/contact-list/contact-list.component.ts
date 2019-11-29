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
}