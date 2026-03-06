import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InternshipService } from '../services/internship.service';
import { InternshipDTO } from '../../models/Internship';
import { CompanyService } from '../services/company.service';
import { ApplicationService } from '../services/application.service';
import { Company } from '../../models/Company';
import { LoginService } from '../../auth/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-internship',
  templateUrl: './view-internship.component.html',
  styleUrl: './view-internship.component.css',
})
export class ViewInternshipComponent implements OnInit {
  internshipId!: number;
  public internship: InternshipDTO | null = null;
  public modalOpen = false;

  constructor(
    private route: ActivatedRoute,
    private service: InternshipService,
    private applicationService: ApplicationService,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
  this.route.paramMap.subscribe((params) => {
    const idParam = params.get('id');
    const id = Number(idParam);
    if (isNaN(id)) {
      this.internship = null;
      return;
    }

    this.service.getById(id).subscribe({
      next: (internship) => {
        this.internship = internship;
      },
      error: (err) => {
        this.internship = null;
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

    this.applicationService.apply(this.internship.id, user.userId).subscribe({
      next: () => {
        this.snackBar.open('Application successfully sent!', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });
        this.closeModal();
      },
      error: (error) => {
        const message =
          error?.error?.message || error?.error?.error || 'Application failed.';

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
}
