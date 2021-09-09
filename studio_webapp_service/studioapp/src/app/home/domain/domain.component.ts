import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Domain } from 'src/app/models/domain';
import { DomainService } from 'src/app/services/domain.service';
import { AddDomainsComponent } from 'src/app/home/add-domains/add-domains.component';
import { MatDialog } from '@angular/material/dialog';
import * as lodash from 'lodash';


@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {

  domains?: Array<Domain>;
  SearchDomain : string;


  constructor(private domainService: DomainService, private router: Router, private dialog: MatDialog) {

  }
  ngOnInit(): void {

    this.domainService.getAllDomains().subscribe((domains) => {
      if (!lodash.isEmpty(domains)) {
        this.domains = domains.map((d) => Object.assign({}, d, {domainName: lodash.startCase(d.domainName.toLowerCase())}));
      }

    },
      (err) => {
        console.log(err);
      }

    )


  }
  openAddDomains(): void {
    const dialogRef = this.dialog.open(AddDomainsComponent, {
      width: '400px',
      height: '500px'
    });

  }

  routeToDomainStudio(domainId): void {
    this.router.navigate(['/home/domains/'+domainId+ '/nodes'])
  }
}
