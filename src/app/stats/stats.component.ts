import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
  providers: [ContactService]
})
export class StatsComponent implements OnInit {

  chart = [];
  contacts: any = [];
  meetingCounts: any = [];
  attendanceChart = [];
  hsChart = [];
  highSchoolCounts = [];
  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.getContacts();
    this.chart = new Chart('canvas', {
      type: 'line',
      data: { labels: "weatherDates",
        datasets: [
          { data: [3,3,3,3,3,3,3,4], borderColor: "#3cba9f", fill: false},
          { data: [2,3,4,5,5,6,7,7], borderColor: "#ffcc00", fill: false},
        ]
      },
      options: { legend: { display: false },
        scales: {
          xAxes: [{ display: true }],
          yAxes: [{ display: true}],
        }
      }
    });

    

  }
  
  getContacts() {
    return this.contactService.getContacts().subscribe(contacts => {
      this.contacts = contacts;
      this.loadAttendanceChart()
    });
  }
  
  loadAttendanceChart() {
    let meetings: number[] = this.contacts.map((x: Contact) =>x.meetings);
    this.meetingCounts = new Array(4).fill(0);

    let highschools = this.contacts.map((x: Contact) => x.highschool);
    this.highSchoolCounts = [];

    for(let h of highschools){
      if(h in this.highSchoolCounts){
        this.highSchoolCounts[h] += 1;
      }
      else{
        this.highSchoolCounts[h]= 1;
      }
      console.log(h, this.highSchoolCounts[h]);
    }
    for (let meeting of meetings) {

      if(meeting <= 6){
        this.meetingCounts[0] += 1;
      }
      else{
        this.meetingCounts[meeting - 6] += 1;
      }
    }
    console.log(Object.entries(this.highSchoolCounts).map(x => x[0])) // index 0 is labels, 1 is the data.

    this.attendanceChart = new Chart('canvas2', {
      type: 'pie',
      data:{ 
        datasets: [
          { data: this.meetingCounts}
        ],
        labels: ['Less than 6', 'Attended 7', 'Attended 8', 'Attended 9']
      },
      options: {legend: {display: false }}
    })

    this.hsChart = new Chart('canvas3',{
      type: 'bar',
      data: {datasets:[{data: Object.entries(this.highSchoolCounts).map(x => x[1]) }],
             labels: Object.entries(this.highSchoolCounts).map(x => x[0]) },
      options: {legend: {display: true}}
    })

  }
}
