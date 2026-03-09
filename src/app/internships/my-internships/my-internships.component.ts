import { Component, OnInit } from '@angular/core';
import { InternshipService } from '../services/internship.service';
import { InternshipDTO } from '../../models/Internship';
import { ApplicationService } from '../services/application.service';
import { LoginService } from '../../auth/services/login.service';
import { Company } from '../../models/Company';
import { CompanyService } from '../services/company.service';
import { Application } from '../../models/Application';

@Component({
  selector: 'app-my-internships',
  templateUrl: './my-internships.component.html',
  styleUrl: './my-internships.component.css',
})
export class MyInternshipsComponent implements OnInit {
  constructor(
    private applicationService: ApplicationService,
    private loginService: LoginService,
  ) {}

  searchTerm: string = '';
  selectedStatus: string | null = null;
  filteredApplications: Application[] = [];
  applications: Application[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  selectedInternshipId: number | null = null;

  ngOnInit(): void {
    let user = this.loginService.getActiveUser();
    if (!user) return;

    this.applicationService.getByStudent(user.userId).subscribe({
      next: (response) => {
        this.applications = response;
        this.filteredApplications = response;
      }
    });
  }


  get paginatedApplications(): Application[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredApplications.slice(
      startIndex,
      startIndex + this.pageSize,
    );
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.filteredApplications.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  applyFilter() {
    this.filteredApplications = this.applications.filter((app) => {
      const statusMatch = this.selectedStatus
        ? app.status.toLowerCase() === this.selectedStatus.toLowerCase()
        : true;

      const nameMatch = this.searchTerm
        ? app.internshipName.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      return statusMatch && nameMatch;
    });

    this.currentPage = 1;
  }
}
