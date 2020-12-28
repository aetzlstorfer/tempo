import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateSwitcherDropdownComponent } from './date-switcher-dropdown.component';

describe('DateSwitcherDropdownComponent', () => {
  let component: DateSwitcherDropdownComponent;
  let fixture: ComponentFixture<DateSwitcherDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateSwitcherDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateSwitcherDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
