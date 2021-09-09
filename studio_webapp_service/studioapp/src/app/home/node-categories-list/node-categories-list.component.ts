import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NodeCategory } from 'src/app/models/node-category';
import { DomainService } from 'src/app/services/domain.service';
import { NodeCategoryService } from 'src/app/services/node-category.service';

@Component({
  selector: 'app-node-categories-list',
  templateUrl: './node-categories-list.component.html',
  styleUrls: ['./node-categories-list.component.css'],
})
export class NodeCategoriesListComponent implements OnInit {
  domainId?: any = '';
  nodeCategories?: Array<NodeCategory>;
  domainName?: String = '';

  constructor(
    private nodeCategoryService: NodeCategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private domainService: DomainService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.domainId = params.get('domainId');

      this.domainService.domainIdBS.subscribe((domainId) => {
        this.domainId = domainId;
        // console.log(domainId)
      });

      this.domainService.getAllDomains().subscribe((domains) => {
        domains = domains.filter((domain) => {
          if (domain.domainId == this.domainId) {
            return true;
          }
          return false;
        });

        this.domainName = domains[0].domainName;

        this.nodeCategoryService
      .getNodeCategoriesWithDomainId(this.domainId)
      .subscribe(
        (nodeCategories) => {
          this.nodeCategories = [];
          // console.log(nodeCategories);
          let jobCat = nodeCategories.find((category) =>
            category.nodeCategoryName.includes('Job')
          );
          // console.log(jobCat)
          if (jobCat != undefined) {
            jobCat['status'] = 'active';
            this.nodeCategories.push(jobCat);
          } else {
            let fakeJobCat = {
              nodeCategoryName: 'Job ' + this.domainName,
              domainId: this.domainId,
              fields: [
                'requestedEducation',
                'skillsRequested',
                'averageSalary',
                'totalJobOpenings',
                'commonJobTitles',
              ],
              description: 'Category -> Job ' + this.domainName,
              status: 'dead',
            };
            this.nodeCategories.push(fakeJobCat);
          }

          let learningCat = nodeCategories.find((category) =>
            category.nodeCategoryName.includes('Learning')
          );

          if (learningCat != undefined) {
            learningCat['status'] = 'active';
            this.nodeCategories.push(learningCat);
          } else {
            let fakeLearningCat = {
              nodeCategoryName: 'Learning ' + this.domainName,
              domainId: this.domainId,
              fields: [
                'courses',
                'averageLearningDuration',
                'level',
                'concepts',
              ],
              description: 'Category -> Learning ' + this.domainName,
              status: 'dead',
            };
            this.nodeCategories.push(fakeLearningCat);
          }

          // console.log(this.nodeCategories);
        },
        (err) => {
          console.log(err);
        }
      );
      });

      
    });

    // this.router.navigate(['/home/domains/' + this.domainId + '/nodecategories']);

    
  }

  goToNodes() {
    this.router.navigate(['/home/domains', this.domainId, 'nodes']);
  }

  goToNodeCategories() {
    this.router.navigate(['/home/domains', this.domainId, 'nodecategories']);
  }
}
