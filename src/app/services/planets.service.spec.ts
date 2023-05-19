import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PlanetsService } from './planets.service';

describe('PlanetsService', () => {
  let service: PlanetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(PlanetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
