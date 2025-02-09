import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightingAdDetailsComponent } from './lighting-ad-details.component';

describe('LightingAdDetailsComponent', () => {
  let component: LightingAdDetailsComponent;
  let fixture: ComponentFixture<LightingAdDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LightingAdDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LightingAdDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
