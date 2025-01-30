import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightingAdComponent } from './lighting-ad.component';

describe('LightingAdComponent', () => {
  let component: LightingAdComponent;
  let fixture: ComponentFixture<LightingAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LightingAdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LightingAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
