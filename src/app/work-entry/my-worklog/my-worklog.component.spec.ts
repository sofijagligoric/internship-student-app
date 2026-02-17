import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWorklogComponent } from './my-worklog.component';

describe('MyWorklogComponent', () => {
  let component: MyWorklogComponent;
  let fixture: ComponentFixture<MyWorklogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyWorklogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyWorklogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
