import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {combineLatest, forkJoin, from, Observable, throwError, zip} from 'rxjs';
import {Unicorn} from '../models/unicorn.model';
import {catchError, concatMap, filter, flatMap, map, mergeMap, pluck, tap, toArray} from 'rxjs/operators';
import {CapacityService} from './capacity.service';

@Injectable({
    providedIn: 'root'
})
export class UnicornService {

    constructor(
        private http: HttpClient,
        private capacityService: CapacityService,
    ) {
    }

    public getAll(): Observable<Unicorn[]> {
        return this.http.get<Unicorn[]>(`${environment.apiUrl}/unicorns`);
    }

    public getAllWithCapacitiesLabels(): Observable<Unicorn[]> {
        return this.getAll().pipe(
            flatMap(e => e),
            concatMap(unicorn => from(unicorn.capacities).pipe(
                mergeMap(capacityId => this.capacityService.get(capacityId)),
                pluck('label'),
                toArray(),
                map((capacityLabels: string[]) => ({...unicorn, capacityLabels})),
                )
            ),
            toArray(),
        );
    }

    public getAllMoreThan21Kg(): Observable<Unicorn[]> {
        return this.getAll().pipe(
            flatMap(e => e),
            filter(unicorn => unicorn.weight > 21),
            map(unicorn => ({...unicorn, name: unicorn.name.toUpperCase()})),
            toArray(),
        );
    }

    public get(id: number): Observable<Unicorn> {
        return this.http.get<Unicorn>(`${environment.apiUrl}/unicorns/${id}`).pipe(
            catchError(err => {
                // faire un truc
                return throwError(err);
            })
        );
    }

    public delete(unicorn: Unicorn): Observable<void> {
        return this.http.delete<void>(`${environment.apiUrl}/unicorns/${unicorn.id}`);
    }

    public update(unicorn: Unicorn): Observable<void> {
        return this.http.put<void>(`${environment.apiUrl}/unicorns/${unicorn.id}`, unicorn);
    }

    public create(unicorn: Unicorn): Observable<void> {
        return this.http.post<void>(`${environment.apiUrl}/unicorns`, unicorn);
    }

    // public exists(id: number): Observable<boolean> {
    //     return this.http.head<unknown>(`${environment.apiUrl}/unicorns/${id}`);
    // }

    // public patch(id: number, capacities: number[]): Observable<any> {
    //     return this.http.patch(`${environment.apiUrl}/unicorns/${id}`, capacities);
    // }

}
