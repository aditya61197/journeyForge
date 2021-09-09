import { Component, Input, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ChartType } from 'chart.js';
import { Node } from 'src/app/models/node';

import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {

  @Input() node : Node;

  skillsRequested: String[] = [];

  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: MultiDataSet = [[]];
  public doughnutChartType: ChartType = 'doughnut';
  commonJobTitles: String[] = [];

  constructor() { }

  ngOnInit(): void {


    this.skillsRequested = this.node['properties']['skillsRequested'] || [];
    this.commonJobTitles = this.node['properties']['commonJobTitles'] || [];
    console.log("Skills Requested",this.skillsRequested);


    let reqEdu = this.node['properties']['requestedEducation'];
    if(reqEdu){

      for(let edu of reqEdu)
      {
        this.doughnutChartLabels.push(edu.name);
        this.doughnutChartData[0].push(edu.percentage);
        // console.log(edu)
      }
    }


  }

}
