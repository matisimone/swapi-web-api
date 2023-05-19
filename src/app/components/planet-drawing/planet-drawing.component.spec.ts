import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetDrawingComponent } from './planet-drawing.component';

describe('PlanetDrawingComponent', () => {
  let component: PlanetDrawingComponent;
  let fixture: ComponentFixture<PlanetDrawingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PlanetDrawingComponent]
    });
    fixture = TestBed.createComponent(PlanetDrawingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
