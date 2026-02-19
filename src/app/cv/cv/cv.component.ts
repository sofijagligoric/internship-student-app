import { Component, OnInit } from '@angular/core';
import { CvService } from '../services/cv.service';
import { Cv } from '../../models/Cv';
import { LoginService } from '../../auth/services/login.service';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.css',
})
export class CvComponent implements OnInit {
  constructor(
    private cvService: CvService,
    private loginService: LoginService,
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
  if (!this.cv || !this.cv.id) return;
  this.cvService.delete(this.cv.id).subscribe({
    next: () => {
      alert("CV deleted successfully!");

      this.cv = null;
      this.noCv = true;
      this.deleteModalVisible = false;
    },
    error: () => {
      alert("Error deleting CV.");
    }
  });
}
}
