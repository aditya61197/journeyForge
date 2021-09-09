import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DomainService } from 'src/app/services/domain.service';

@Component({
  selector: 'app-domain-studio',
  templateUrl: './domain-studio.component.html',
  styleUrls: ['./domain-studio.component.css']
})
export class DomainStudioComponent implements OnInit {

  domainId?: any;
  domainName: String = "";


  constructor(private router: Router, private route: ActivatedRoute, private domainService: DomainService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.domainId = params.get('domainId');

      this.router.navigate(['/home/domains/' + this.domainId + '/nodes']);
      // console.log(this.domainId)
      this.domainService.domainIdBS.next(this.domainId);
      this.domainService.getAllDomains().subscribe(
        (domains) => {
          domains = domains.filter((domain) => {
            if (domain.domainId == this.domainId) {
              return true;
            }
            return false;
          })
          this.domainName = domains[0].domainName;
        }
      )

    });

  }

  goToDomains() {
    this.router.navigate(['/home/domains']);
  }

  goToNodes() {
    this.router.navigate(['/home/domains', this.domainId, 'nodes']);
  }

  goToNodeCategories() {
    this.router.navigate(['/home/domains', this.domainId, 'nodecategories'])
  }

  goToJourneyView() {
    this.router.navigate(['/home/domains', this.domainId, 'journeyview'])
  }


  goToStudioComponent() {
    this.router.navigate(['/home/domains', this.domainId, 'studio']);

  }




}
