import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InternshipService } from '../services/internship.service';
import { InternshipDTO } from '../../models/Internship';
import { CompanyService } from '../services/company.service';
import { ApplicationService } from '../services/application.service';
import { Company } from '../../models/Company';
import { LoginService } from '../../auth/services/login.service';

@Component({
  selector: 'app-view-internship',
  templateUrl: './view-internship.component.html',
  styleUrl: './view-internship.component.css'
})
export class ViewInternshipComponent implements OnInit {

  internshipId!: number;
  public internship : InternshipDTO | null = null;
   public company : Company | null = null;
   public modalOpen = false;

  constructor(private route: ActivatedRoute, private service: InternshipService, private companyService : CompanyService, private applicationService : ApplicationService, private loginService : LoginService) {}

 ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const id = Number(params.get('id'));

    this.service.getById(id).subscribe(internship => {
      this.internship = internship;

      if (internship.companyId) {
        this.companyService.getById(internship.companyId)
          .subscribe(company => this.company = company);
      }
    });
  });
}

openModal() {
    this.modalOpen = true;
  }

  closeModal() {
     this.modalOpen = false;
  }

  sendApplication() {
    const user = this.loginService.getActiveUser();
    if (!user || !this.internship) return;

    this.applicationService
      .apply(this.internship.id, user.userId)
      .subscribe({
        next: () => {
          alert('Application successfully sent!');
          this.closeModal();
        },
        error: () => {
          alert('Application failed.');
          this.closeModal();
        },
      });
  }
}