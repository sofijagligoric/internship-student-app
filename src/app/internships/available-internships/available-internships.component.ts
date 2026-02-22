import { Component, OnInit } from '@angular/core';
import { InternshipService } from '../services/internship.service';
import { InternshipDTO } from '../../models/Internship';
import { ApplicationService } from '../services/application.service';
import { LoginService } from '../../auth/services/login.service';
import { Company } from '../../models/Company';
import { CompanyService } from '../services/company.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-available-internships',
  templateUrl: './available-internships.component.html',
  styleUrl: './available-internships.component.css',
})
export class AvailableInternshipsComponent implements OnInit {
  constructor(
    private internshipService: InternshipService,
    private applicationService: ApplicationService,
    private loginService: LoginService,
    private companyService: CompanyService,
    private snackBar: MatSnackBar,
  ) {}

  public allInternships: InternshipDTO[] = [];
  public filteredInternships: InternshipDTO[] = [];
  public companies: Company[] = [];
  searchTerm: string = '';
  selectedInternship: InternshipDTO | null = null;
  selectedCompanyId: number | null = null;
  currentPage: number = 1;
  pageSize: number = 10;

  ngOnInit(): void {
    this.internshipService.getAvailable().subscribe({
      next: (response) => {
        this.allInternships = response;
        this.filteredInternships = response;
      },
      error: () => {
        console.log('Error loading available internships.');
      },
    });

    this.companyService.getAll().subscribe({
      next: (res) => {
        this.companies = res;
      },
    });
  }

  getCompanyName(companyId: number): string {
    const company = this.companies.find((c) => c.id === companyId);
    return company ? company.name : 'Unknown';
  }
  /* 
  applyFilter() {
    this.filteredInternships = this.allInternships.filter((r) =>
      r.technologies?.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
     r.skills?.toLowerCase().includes(this.searchTerm.toLowerCase()),
    );
    this.currentPage = 1;
  } */

  applyFilter() {
    this.filteredInternships = this.allInternships.filter((r) => {
      const matchesInternship =
        !this.selectedCompanyId || r.companyId === this.selectedCompanyId;

      const matchesSearch =
        !this.searchTerm ||
        r.technologies?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        r.skills?.toLowerCase().includes(this.searchTerm.toLowerCase());

      return matchesInternship && matchesSearch;
    });

    this.currentPage = 1;
  }

  openModal(rec: InternshipDTO) {
    this.selectedInternship = rec;
  }

  closeModal() {
    this.selectedInternship = null;
  }

  sendApplication() {
    const user = this.loginService.getActiveUser();
    if (!user || !this.selectedInternship) return;

    this.applicationService
      .apply(this.selectedInternship.id, user.userId)
      .subscribe({
        next: () => {
          this.snackBar.open('Application successfully sent.', 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
          });

          this.closeModal();
        },
        error: (error) => {
          const message =
            error?.error?.message ||
            error?.error?.error ||
            'Application failed.';

          this.snackBar.open(message, 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
          });

          this.closeModal();
        },
      });
  }

  get paginatedInternships(): InternshipDTO[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredInternships.slice(
      startIndex,
      startIndex + this.pageSize,
    );
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.filteredInternships.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
