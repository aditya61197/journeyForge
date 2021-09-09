import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Journey } from 'src/app/models/journey';
import { JourneyService } from 'src/app/services/journey.service';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css']
})
export class JourneyComponent implements OnInit {

  hierarchialGraph = { nodes: [], links: [] }
  nodesArray: any[] = []
  linksArray: any[] = []
  countNodeArray = 0;
  countLinkArray = 0;
  journeys: Array<Journey>;
  update$: Subject<any> = new Subject();

  constructor(private journeyService: JourneyService){}


  public ngOnInit(): void {
   
  }
}