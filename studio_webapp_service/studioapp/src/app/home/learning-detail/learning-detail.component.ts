import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Node } from 'src/app/models/node';


@Component({
  selector: 'app-learning-detail',
  templateUrl: './learning-detail.component.html',
  styleUrls: ['./learning-detail.component.css']
})
export class LearningDetailComponent implements OnInit {

  @Input() node : Node;

  level: String = "";
  concepts : String[] = [];
  courses = [];
  totalDuration =  0;

  constructor() { }

  ngOnInit(): void {

    this.totalDuration =  0;
    this.concepts= this.node['properties']['concepts'];
    this.level = this.node['properties']['level'];
    this.courses = this.node['properties']['courses'];
    this.courses.map((course) => {
      this.totalDuration = this.totalDuration + parseInt(course.duration);
      // console.log(this.totalDuration);
    })


  }


  // {
  //   "nodeName": "Cybersecurity Architect",
  //   "nodeCategoryId": "3b9fdf35-4d98-4666-b8b0-e14ad79ac1b6",
  //   "domainId": "1947d9ea-f4ae-4a61-a178-01b474346200",
  //   "properties": {
  //       "averageLearningDuration" : "20000",
  //       "level" : "Intermediate",
  //       "concepts": [
  //            "Java", "HTML", "CSS", "Bootstrap", "Angular"
  //       ],
  //       "courses": [
  //           {
  //              "name": "Web Development",
  //              "link": "https://www.google.com"
  //              "duration": "300"
  //           },
  //           {
  //              "name": "Full Stack",
  //              "link": "https://www.yahoo.com"
  //              "duration": "1500"
  //           }
  //       ]
  //    }
  // }

}
