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
    private internshipService: InternshipService,
    private applicationService: ApplicationService,
    private snackBar: MatSnackBar,
  ) {}

  workEntries: Workentry[] = [];
  selectedWorentry: Workentry | null = null;
  searchTerm: string = '';
  filteredEntries: Workentry[] = [];
  internships: InternshipDTO[] = [];
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
      },
      error: () => {
        console.log('Erorr loading work entries.');
      },
    });

    this.applicationService
      .getByStudentAndStatus(user.userId, 'ACCEPTED')
      .subscribe({
        next: (response) => {
          this.applications = response;

          this.internshipService.getAll().subscribe({
            next: (res) => {
              const acceptedIds = this.applications.map((a) => a.internshipId);
              this.internships = res.filter((i) => acceptedIds.includes(i.id!));
            },
            error: () => console.log('Error loading internships.'),
          });
        },
        error: () => console.log('Error loading applications.'),
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
    const internship = this.internships.find((c) => c.id === intId);
    return internship ? internship.name : 'Unknown';
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
