import { Component, Input, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-job-category-view',
  templateUrl: './job-category-view.component.html',
  styleUrls: ['./job-category-view.component.css']
})
export class JobCategoryViewComponent implements OnInit {
  show:boolean;
  @Input() node : Node;

  skillsRequested: String[] = [];

  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: MultiDataSet = [[]];
  public doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit(): void {
    this.skillsRequested = this.node['properties']['skillsRequested'];
    
    let reqEdu = this.node['properties']['requestedEducation'];
    for(let edu of reqEdu)
    {
      this.doughnutChartLabels.push(edu.name);
      this.doughnutChartData[0].push(edu.percentage);
      // console.log(edu)
    }



  }

}
