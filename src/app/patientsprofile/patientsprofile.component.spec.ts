import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsprofileComponent } from './patientsprofile.component';

describe('PatientsprofileComponent', () => {
  let component: PatientsprofileComponent;
  let fixture: ComponentFixture<PatientsprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientsprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientsprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
