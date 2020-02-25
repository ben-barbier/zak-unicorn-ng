import {Component} from '@angular/core';
import {from, of, throwError} from 'rxjs';
import {catchError, filter, map, pluck, reduce, tap, toArray} from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
}
