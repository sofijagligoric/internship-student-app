import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorklogComponent } from './create-worklog.component';

describe('CreateWorklogComponent', () => {
  let component: CreateWorklogComponent;
  let fixture: ComponentFixture<CreateWorklogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateWorklogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateWorklogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
