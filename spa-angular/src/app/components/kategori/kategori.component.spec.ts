import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KategoriComponent } from './kategori.component';

describe('KategoriComponent', () => {
  let component: KategoriComponent;
  let fixture: ComponentFixture<KategoriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KategoriComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KategoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
