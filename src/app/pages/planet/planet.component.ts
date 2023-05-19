import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanetsService } from 'src/app/services/planets.service';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Planet } from 'src/app/models/planet.model';
import { PlanetDrawingComponent } from 'src/app/components/planet-drawing/planet-drawing.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-planet',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, RouterModule, MatButtonModule, MatIconModule, PlanetDrawingComponent, MatCardModule],
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent {
  planetId!: number;
  planet!: Planet;
  isReady: boolean = false;

  constructor (
    readonly planetsService: PlanetsService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.planetId = id;
      }
    });

    this.planetsService.getPlanetById(this.planetId).subscribe({
      next: (data: any) => {
        this.planet = data;
        this.isReady = true;
      },
      error: (err: any) => {
        console.error(err);
        this.isReady = true;
      }
    })
  };
}
