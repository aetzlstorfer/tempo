import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeInputPrependComponent } from './time-input-prepend.component';

describe('TimeInputPrependComponent', () => {
  let component: TimeInputPrependComponent;
  let fixture: ComponentFixture<TimeInputPrependComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeInputPrependComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeInputPrependComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
