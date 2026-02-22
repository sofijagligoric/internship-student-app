import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../auth/services/login.service';
import { WorkentryService } from '../services/workentry.service';
import { ApplicationService } from '../../internships/services/application.service';
import { InternshipDTO } from '../../models/Internship';
import { Application } from '../../models/Application';
import { InternshipService } from '../../internships/services/internship.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { Workentry } from '../../models/Workentry';

@Component({
  selector: 'app-create-worklog',
  templateUrl: './create-worklog.component.html',
  styleUrl: './create-worklog.component.css',
})
export class CreateWorklogComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private workentryService: WorkentryService,
    private applicationService: ApplicationService,
    private internshipService: InternshipService,
    private fb: FormBuilder,
  ) {}

  applications: Application[] = [];
  acceptedInternships: InternshipDTO[] = [];
  form1: FormGroup = new FormGroup({});

  minDate!: string;
  maxDate!: string;

  ngOnInit(): void {
    const user = this.loginService.getActiveUser();
    if (!user) return;
    this.form1 = this.fb.group({
      internshipId: [null, Validators.required],
      weekStart: [null, Validators.required],
      activity: ['', Validators.required],
    });

    this.applicationService
      .getByStudentAndStatus(user.userId, 'ACCEPTED')
      .pipe(
        switchMap((applications) => {
          this.applications = applications;
          return this.internshipService.getAll();
        }),
      )
      .subscribe({
        next: (internships) => {
          this.acceptedInternships = this.getAcceptedInternships(internships);
        },
        error: () => {
          console.log('Error loading data.');
        },
      });
  }

  getAcceptedInternships(internships: InternshipDTO[]): InternshipDTO[] {
    const acceptedIds = this.applications.map((a) => a.internshipId);
    return internships.filter((i) => acceptedIds.includes(i.id));
  }

  onInternshipChange() {
    const selectedId = this.form1.get('internshipId')?.value;
    const selected = this.acceptedInternships.find((i) => i.id === selectedId);
    if (selected) {
      this.minDate = selected.startDate;
      this.maxDate = selected.endDate;
      this.form1.get('weekStart')?.reset();
    }
  }

  submit() {
    if (this.form1.invalid) return;
    const user = this.loginService.getActiveUser();
    if (!user) return;
    const workentry: Workentry = {
      internshipId: this.form1.value.internshipId!,
      weekStart: this.form1.value.weekStart!,
      activity: this.form1.value.activity!,
      studentId: user.userId,
    };
    this.workentryService.create(workentry).subscribe({
      next: () => {
        alert('Work entry created!');
        this.form1.reset({
          internshipId: null,
          weekStart: null,
          activity: '',
        });
      },
      error: (err) => {
        if (err.error?.message?.includes('already exists')) {
          alert('Work log already exists for this week!');
          this.form1.get('weekStart')?.reset();
        } else {
          alert(err.error?.message || 'Error creating work entry.');
        }
      },
    });
  }
}
