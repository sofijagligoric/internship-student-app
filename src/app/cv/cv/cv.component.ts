import { Component, OnInit } from '@angular/core';
import { CvService } from '../services/cv.service';
import { Cv } from '../../models/Cv';
import { LoginService } from '../../auth/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.css',
})
export class CvComponent implements OnInit {
  constructor(
    private cvService: CvService,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
  ) {}

  public cv: Cv | null = null;
  public noCv = false;
  public deleteModalVisible = false;

  ngOnInit(): void {
    let user = this.loginService.getActiveUser();
    if (!user) return;
    this.cvService.getByStudent(user.userId).subscribe({
      next: (response) => {
        this.cv = response;
        this.noCv = false;
      },
      error: () => {
        this.noCv = true;
      },
    });
  }

  getImageUrl(): string {
    if (!this.cv?.imagePath) {
      return '';
    }

    return `http://localhost:8080/uploads/cvImages/${this.cv.imagePath}`;
  }

  openModal() {
    this.deleteModalVisible = true;
  }

  closeModal() {
    this.deleteModalVisible = false;
  }

  deleteCv() {
    console.log('CV koji brišem:', this.cv);
    console.log('ID koji šaljem:', this.cv?.id);
    if (!this.cv || !this.cv.id) return;
    this.cvService.delete(this.cv.id).subscribe({
      next: () => {
        this.snackBar.open('CV deleted successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });

        this.cv = null;
        this.noCv = true;
        this.deleteModalVisible = false;
      },
      error: () => {
        this.snackBar.open('Error deleting CV.', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
      },
    });
  }
}
