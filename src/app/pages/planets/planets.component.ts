import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { PlanetsService } from './../../services/planets.service';
import { CardsComponent } from '../../components/cards/cards.component';
import { Planet } from 'src/app/models/planet.model';
import { Select } from 'src/app/models/form.model';
import { SortType } from 'src/app/utils/app.data';

@Component({
  selector: 'app-planets',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, FormsModule, CardsComponent],
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  planets!: Planet[];
  length = 60;
  pageSize = 10;
  pageIndex = 0;
  paginatedData: Planet[] = [];
  isReady: boolean = false;
  sortTypes: Select[] = [
    {value: SortType.alphabetical_order, label: 'Alphabetical Order'},
    {value: SortType.diameter_bigger_to_smaller, label: 'Bigger to Smaller'},
    {value: SortType.diameter_smaller_to_bigger, label: 'Smaller to Bigger'},
    {value: SortType.rotation_period_faster_to_slower, label: 'Rotation Period - Faster to Slower'},
    {value: SortType.rotation_period_slower_to_faster, label: 'Rotation Period - Slower to Faster'},
    {value: SortType.population_from_more_to_less, label: 'Population - More to Less'},
    {value: SortType.population_from_less_to_more, label: 'Population - Less to More'},
  ];

  constructor (
    readonly planetsService: PlanetsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const page = params['page'];
      if (page) {
        this.pageIndex = page;
      }
    });

    this.planetsService.getAllPlanets().subscribe({
      next: (data: any) => {
        this.planets = data;
        this.updatePaginatedData();
        this.isReady = true;
      },
      error: (err: any) => {
        console.error(err);
        this.isReady = true;
      }
    })
  };

  ngAfterViewInit() {
    this.paginator.pageSize = this.pageSize;
    this.paginator.page.subscribe((event: PageEvent) => {
      this.pageIndex = event.pageIndex;
      this.updatePaginatedData();
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
  }

  updatePaginatedData(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.paginatedData = this.planets.slice(startIndex, endIndex);
  }

  sortBy(sortType: SortType) {
    switch (sortType) {
      case SortType.alphabetical_order:
        this.planets.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case SortType.diameter_bigger_to_smaller:
        this.planets.sort((a, b) => this.compareValues(a.diameter, b.diameter));
        break;
      case SortType.diameter_smaller_to_bigger:
        this.planets.sort((a, b) => this.compareValues(b.diameter, a.diameter));
        break;
      case SortType.rotation_period_faster_to_slower:
        this.planets.sort((a, b) => this.compareValues(a.rotation_period, b.rotation_period));
        break;
      case SortType.rotation_period_slower_to_faster:
        this.planets.sort((a, b) => this.compareValues(b.rotation_period, a.rotation_period));
        break;
      case SortType.population_from_more_to_less:
        this.planets.sort((a, b) => this.compareValues(a.population, b.population));
        break;
      case SortType.population_from_less_to_more:
        this.planets.sort((a, b) => this.compareValues(b.population, a.population));
        break;
    }
    this.updatePaginatedData();
  }

  compareValues(valueA: string, valueB: string): number {
    const parsedValueA = Number(valueA);
    const parsedValueB = Number(valueB);

    if (parsedValueA === parsedValueB) {
      return 0;
    } else if (valueA === 'unknown') {
      return 1;
    } else if (valueB === 'unknown') {
      return -1;
    } else {
      return parsedValueB - parsedValueA;
    }
  }
}
