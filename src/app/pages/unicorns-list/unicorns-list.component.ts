import {Component} from '@angular/core';
import {Unicorn} from '../../shared/models/unicorn.model';
import {UnicornService} from '../../shared/services/unicorn.service';

@Component({
    selector: 'app-unicorns-list',
    templateUrl: './unicorns-list.component.html',
    styleUrls: ['./unicorns-list.component.scss'],
})
export class UnicornsListComponent {

    public unicorns: Unicorn[] = [];

    constructor(private unicornService: UnicornService) {
        unicornService.getAllWithCapacitiesLabels().subscribe(unicorns => this.unicorns = unicorns);
    }

    public removeUnicornFromList(unicorn: Unicorn) {
        this.unicornService.delete(unicorn).subscribe(() => {
            this.unicorns = this.unicorns.filter(u => u.id !== unicorn.id);
        });
    }
}
