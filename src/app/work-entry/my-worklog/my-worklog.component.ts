import { Component, OnInit } from '@angular/core';
import { WorkentryService } from '../services/workentry.service';
import { LoginService } from '../../auth/services/login.service';
import { Workentry } from '../../models/Workentry';
import { InternshipService } from '../../internships/services/internship.service';
import { ApplicationService } from '../../internships/services/application.service';
import { InternshipDTO } from '../../models/Internship';
import { Application } from '../../models/Application';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-worklog',
  templateUrl: './my-worklog.component.html',
  styleUrl: './my-worklog.component.css',
})
export class MyWorklogComponent implements OnInit {
  constructor(
    private workentryService: WorkentryService,
    private loginService: LoginService,
    private applicationService: ApplicationService,
    private snackBar: MatSnackBar,
  ) {}

  workEntries: Workentry[] = [];
  selectedWorentry: Workentry | null = null;
  searchTerm: string = '';
  filteredEntries: Workentry[] = [];
  applications: Application[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  selectedInternshipId: number | null = null;

  ngOnInit(): void {
  let user = this.loginService.getActiveUser();
  if (!user) return;
  this.workentryService.getByStudent(user.userId).subscribe({
    next: (response) => {
      this.workEntries = response;
      this.filteredEntries = response;
    }
  });
  this.applicationService
    .getByStudentAndStatus(user.userId, 'ACCEPTED')
    .subscribe({
      next: (response) => {
        this.applications = response;
      }
    });
}

  applyFilter() {
    this.filteredEntries = this.workEntries.filter((w) => {
      const matchesInternship =
        !this.selectedInternshipId ||
        w.internshipId === this.selectedInternshipId;

      const matchesSearch =
        !this.searchTerm ||
        w.weekStart?.toLowerCase().includes(this.searchTerm.toLowerCase());

      return matchesInternship && matchesSearch;
    });

    this.currentPage = 1;
  }

  openModal(rec: Workentry) {
    this.selectedWorentry = rec;
  }

  closeModal() {
    this.selectedWorentry = null;
  }

  deleteWE() {
    if (!this.selectedWorentry?.id) return;

    this.workentryService.delete(this.selectedWorentry.id).subscribe({
      next: () => {
        this.workEntries = this.workEntries.filter(
          (w) => w.id !== this.selectedWorentry?.id,
        );

        this.applyFilter();
        this.closeModal();

        this.snackBar.open('Entry deleted.', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });
      },
      error: () => {
        this.snackBar.open('Failed to delete.', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
        this.closeModal();
      },
    });
  }

 getInternshipName(intId: number): string {
  const app = this.applications.find((a) => a.internshipId === intId);
  return app ? app.internshipName : 'Unknown';
}

  get paginatedWorkentries(): Workentry[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredEntries.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.filteredEntries.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
