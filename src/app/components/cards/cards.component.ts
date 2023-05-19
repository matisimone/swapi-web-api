import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { CardComponent } from '../card/card.component';
import { Planet } from 'src/app/models/planet.model';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, MatGridListModule, CardComponent],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {
  @Input() planets!: Planet[];
}
