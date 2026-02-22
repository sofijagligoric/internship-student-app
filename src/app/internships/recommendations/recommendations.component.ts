import { Component, OnInit } from '@angular/core';
import { RecommendationService } from '../services/recommendation.service';
import { LoginService } from '../../auth/services/login.service';
import { Recommendation } from '../../models/Recommendation';
import { ApplicationService } from '../services/application.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.css',
})
export class RecommendationsComponent implements OnInit {
  constructor(
    private recService: RecommendationService,
    private loginService: LoginService,
    private applicationService: ApplicationService,
    private snackBar: MatSnackBar,
  ) {}

  allRecommendations: Recommendation[] = [];
  noCv: boolean = false;
  loading: boolean = true;
  searchTerm: string = '';
  filteredRecommendations: Recommendation[] = [];
  selectedInternship: Recommendation | null = null;

  ngOnInit(): void {
    let user = this.loginService.getActiveUser();
    if (!user) {
      this.loading = false;
      return;
    }
    this.recService.getRecommendations(user.userId).subscribe({
      next: (data) => {
        this.allRecommendations = data;
        this.filteredRecommendations = data;
        this.loading = false;
      },
      error: (err) => {
        if (err.status === 404) {
          this.noCv = true;
        }
        this.loading = false;
      },
    });
  }

  applyFilter() {
    this.filteredRecommendations = this.allRecommendations.filter(
      (r) =>
        r.technologies.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        r.skills.toLowerCase().includes(this.searchTerm.toLowerCase()),
    );
  }

  openModal(rec: Recommendation) {
    this.selectedInternship = rec;
  }

  closeModal() {
    this.selectedInternship = null;
  }

  sendApplication() {
    const user = this.loginService.getActiveUser();
    if (!user || !this.selectedInternship) return;

    this.applicationService
      .apply(this.selectedInternship.internshipId, user.userId)
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
}
