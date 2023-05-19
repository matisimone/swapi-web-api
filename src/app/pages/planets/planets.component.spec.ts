import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlanetsComponent } from './planets.component';

describe('PlanetsComponent', () => {
  let component: PlanetsComponent;
  let fixture: ComponentFixture<PlanetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, BrowserAnimationsModule, PlanetsComponent]
    });
    fixture = TestBed.createComponent(PlanetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
