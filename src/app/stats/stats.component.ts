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

  //API Variables
  contacts: any = [];

  //Chart Variables
  chart = [];
  gradeChart = [];
  attendanceChart = [];
  hsChart = [];
  majorChart = [];
  stateChart = [];

  //Counts for Charts
  meetingCounts: any = [];
  highSchoolCounts = [];
  gradeCounts = [];
  majorCounts = [];
  stateCounts = [];

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.getContacts();

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

    let grades = this.contacts.map((x: Contact) => x.grade);
    this.gradeCounts = [];

    let majors = this.contacts.map((x: Contact) => x.major);
    this.majorCounts = [];

    let states = this.contacts.map((x: Contact) => x.state);
    this.stateCounts = [];

    for(let s of states){
      if(s in this.stateCounts){
        this.stateCounts[s] += 1;
      } else {
        this.stateCounts[s] = 1;
      }
    }

    for(let m of majors){
      if(m in this.majorCounts){
        this.majorCounts[m] += 1;
      } else {
        this.majorCounts[m] = 1;
      }
    }

    for(let g of grades){
      if(g in this.gradeCounts){
        this.gradeCounts[g] += 1;
      } else {
        this.gradeCounts[g] = 1;
      }
    }

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
             labels: Object.entries(this.highSchoolCounts).map(x => x[0])},
      options: {legend: {display: true},
                scales: {yAxes:[{ticks:{beginAtZero: true}}]}}
    })

    this.gradeChart = new Chart('gradeCanvas', {
      type: 'doughnut',
      data: {datasets:[{data: Object.entries(this.gradeCounts).map(x => x[1]) }],
             labels: Object.entries(this.gradeCounts).map(x => x[0]) },
      options: {legend: {display: true}}
    })

    this.majorChart = new Chart('majorCanvas', {
      type: 'polarArea',
      data: {datasets:[{data: Object.entries(this.majorCounts).map(x => x[1]) }],
             labels: Object.entries(this.majorCounts).map(x => x[0]) },
      options: {legend: {display: false}}
    })

    this.stateChart = new Chart('stateCanvas', {
      type: 'pie',
      data: {datasets:[{data: Object.entries(this.stateCounts).map(x => x[1]) }],
             labels: Object.entries(this.stateCounts).map(x => x[0]) },
      options: {legend: {display: true}}
    })

  }
}
