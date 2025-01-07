import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenulisComponent } from './penulis.component';

describe('PenulisComponent', () => {
  let component: PenulisComponent;
  let fixture: ComponentFixture<PenulisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PenulisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PenulisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
