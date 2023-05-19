import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, concatMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {
  private baseUrl: string = 'https://swapi.dev/api';
  private resourcePlanets: string = '/planets';

  constructor(private http: HttpClient) {}

  getPlanets(page?: number) {
    return this.http.get(`${this.baseUrl}${this.resourcePlanets}?page=${page}`);
  }

  getPlanetById(id: number) {
    return this.http.get(`${this.baseUrl}${this.resourcePlanets}/${id}`)
  }

  getAllPlanets(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${this.resourcePlanets}`).pipe(
      concatMap((response: any) => {
        const planets = response.results;
        const nextPageUrl = response.next;

        return this.fetchNextPages(planets, nextPageUrl);
      })
    );
  }

  private fetchNextPages(planets: any[], nextPageUrl: string): Observable<any[]> {
    if (nextPageUrl) {
      return this.http.get<any>(nextPageUrl).pipe(
        concatMap((response: any) => {
          const nextPlanets = response.results;
          const updatedPlanets = planets.concat(nextPlanets);
          const nextNextPageUrl = response.next;

          return this.fetchNextPages(updatedPlanets, nextNextPageUrl);
        })
      );
    } else {
      return of(planets);
    }
  }
}
