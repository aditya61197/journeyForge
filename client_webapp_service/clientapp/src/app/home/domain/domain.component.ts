import { Component, OnInit, Inject} from '@angular/core';
import {DomainService} from 'src/app/services/domain.service';
import { Domain } from 'src/app/models/domain';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SkillsInputDialogComponent } from '../skills-input-dialog/skills-input-dialog.component';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {
  domains ?: Array<Domain>;
  domainId?: any;
  filterTerm : string;
  filtered : boolean = false;
  constructor(private domainService: DomainService, private router: Router, private route: ActivatedRoute, public dialog: MatDialog ) { 
  }

  ngOnInit(): void {

    this.domainService.getAllDomains().subscribe(
      (domains)=>{
        
        this.domains = domains;
        // console.log(domains);
      },
      (err)=>{
        console.log(err);
      }
      )

    /*  this.route.paramMap.subscribe((params: ParamMap) => {
        console.log(params)
        this.domainId = params.get('domainId');
  
  this.router.navigate(['/home/domains/' + this.domainId + '/journeymgmt']);
        console.log(this.domainId)
        this.domainService.domainIdBS.next(this.domainId);
      });*/
  } 

  clearFilter()
  {

    this.domainService.getAllDomains().subscribe(
      (domains)=>{
        
        this.domains = domains;
        // console.log(domains);
        this.filtered = false;

      },
      (err)=>{
        console.log(err);
      }
    )
  }
 
  goToJourneyGraph(domainId) {
    this.router.navigate(['/home/domains/'+domainId+ '/journeymgmt'])
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SkillsInputDialogComponent, {
      width: '40%',
    });

    dialogRef.afterClosed().subscribe(interests => {
      // console.log(skills);
      this.domains = this.domains.filter(
        (domain)=>{
          if(domain.tags != null)
          {
            for(let tag of domain.tags)
            {
              if(interests.includes(tag))
              {
                return true;
              }
            }
          }
          return false;
        }
      )

      this.filtered = true;
    });
  }

}