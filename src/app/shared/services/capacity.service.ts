import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Capacity} from '../models/capacity.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CapacityService {

    constructor(private http: HttpClient) {
    }

    public get(id: number): Observable<Capacity> {
        return this.http.get<Capacity>(`${environment.apiUrl}/capacities/${id}`);
    }

    public getAll(): Observable<Capacity[]> {
        return this.http.get<Capacity[]>(`${environment.apiUrl}/capacities`);
    }

}
