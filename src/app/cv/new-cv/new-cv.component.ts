import { Component, OnInit } from '@angular/core';
import { CvService } from '../services/cv.service';
import { Cv } from '../../models/Cv';
import { LoginService } from '../../auth/services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-cv',
  templateUrl: './new-cv.component.html',
  styleUrl: './new-cv.component.css',
})
export class NewCvComponent implements OnInit {
  constructor(
    private cvService: CvService,
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  public cv: Cv | null = null;
  public imagePreview: string | null = null;
  public removeImage: boolean = false;
  selectedImage: File | null = null;
  public cvForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    let user = this.loginService.getActiveUser();
    if (!user) return;
    this.cvForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contact: ['', [Validators.required]],
      description: [''],
      school: ['', Validators.required],
      internships: [''],
      experience: [''],
      skills: ['', Validators.required],
      interests: [''],
      training: [''],
    });

    this.cvService.getByStudent(user.userId).subscribe({
      next: (response) => {
        this.cv = response;
        if (response.imagePath) {
          this.imagePreview = `http://localhost:8080/uploads/cvImages/${response.imagePath}`;
        }
        this.cvForm.patchValue({
          firstName: response.firstName,
          lastName: response.lastName,
          contact: response.contact,
          description: response.description,
          school: response.school,
          internships: response.internships,
          experience: response.experience,
          skills: response.skills,
          interests: response.interests,
          training: response.training,
        });
      },
      error: () => {
        this.cv = null;
      },
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.selectedImage = file;
      this.removeImage = false;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeCurrentImage() {
    this.selectedImage = null;
    this.imagePreview = null;
    this.removeImage = true;
  }

  createCv() {
    if (this.cvForm.invalid) return;
    const user = this.loginService.getActiveUser();
    if (!user) return;
    const cvData: Cv = {
      ...this.cvForm.value,
      studentId: user.userId,
    };

    if (this.removeImage) {
      cvData.imagePath = '';
    }

    if (this.cv) {
      this.cvService
        .update(this.cv.id!, cvData, this.selectedImage ?? undefined)
        .subscribe({
          next: (res) => {
            this.snackBar.open('CV updated successfully!', 'Close', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['success-snackbar'],
            });
            this.cv = res;
            this.router.navigate(['/app/cv']);
          },
          error: () =>
            this.snackBar.open('Error updating CV', 'Close', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['error-snackbar'],
            }),
        });
    } else {
      this.cvService.create(cvData, this.selectedImage ?? undefined).subscribe({
        next: (res) => {
          this.snackBar.open('CV created successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
          });
          this.cv = res;
          this.router.navigate(['/app/cv']);
        },
        error: () =>
          this.snackBar.open('Error creating CV', 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
          }),
      });
    }
  }
}
