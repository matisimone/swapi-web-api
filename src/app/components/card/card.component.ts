import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Planet } from 'src/app/models/planet.model';
import { PlanetDrawingComponent } from '../planet-drawing/planet-drawing.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, PlanetDrawingComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() planet!: Planet;

  constructor(private router: Router) {}

  handleExplore(url: string) {
    if (url) {
      const id = url.split('/').splice(-2)[0];
      this.router.navigate(['/planets', id]).then(() => {
        window.location.reload();
      });
    }
  }
}
