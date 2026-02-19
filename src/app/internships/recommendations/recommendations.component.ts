import { Component, OnInit } from '@angular/core';
import { RecommendationService } from '../services/recommendation.service';
import { LoginService } from '../../auth/services/login.service';
import { Recommendation } from '../../models/Recommendation';
import { ApplicationService } from '../services/application.service';

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
    this.filteredRecommendations = this.allRecommendations.filter((r) =>
      r.technologies.toLowerCase().includes(this.searchTerm.toLowerCase()),
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
