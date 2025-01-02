import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumberComponent } from './sumber.component';

describe('SumberComponent', () => {
  let component: SumberComponent;
  let fixture: ComponentFixture<SumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SumberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
