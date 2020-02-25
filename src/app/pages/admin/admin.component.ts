import {Component, OnDestroy} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnDestroy {

    public time: Date;
    private timeSub: Subscription;

    constructor() {
        this.timeSub = interval(1000).pipe(
            map(() => new Date()),
        ).subscribe(time => {
            console.count('time');
            this.time = time;
        });
    }

    ngOnDestroy(): void {
        sessionStorage.setItem('unicorn', JSON.stringify({}));
        localStorage.setItem('unicorn', JSON.stringify({}));


        this.timeSub.unsubscribe();
    }

}
