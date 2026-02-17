import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableInternshipsComponent } from './available-internships.component';

describe('AvailableInternshipsComponent', () => {
  let component: AvailableInternshipsComponent;
  let fixture: ComponentFixture<AvailableInternshipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailableInternshipsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvailableInternshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
