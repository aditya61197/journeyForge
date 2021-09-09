import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesBsService {

  conceptsListBS = new BehaviorSubject([]);
  skillsRequestedBS = new BehaviorSubject([]);
  jobTitleListBS = new BehaviorSubject([]);
  requestedEducationBS = new BehaviorSubject([]);
  coursesListBS = new BehaviorSubject([]);

  constructor() { }
}
