import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  chart = [];

  constructor() { }

  ngOnInit() {

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: "weatherDates",
        datasets: [
          { 
            data: [3,3,3,3,3,3,3,4],
            borderColor: "#3cba9f",
            fill: false
          },
          { 
            data: [2,3,4,5,5,6,7,7],
            borderColor: "#ffcc00",
            fill: false
          },
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }

}


 

