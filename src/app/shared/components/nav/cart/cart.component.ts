import {Component} from '@angular/core';
import {CartService} from '../../../services/cart.service';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent {

    public cartSize$ = this.cartService.cart$.pipe(map(cart => cart.length));

    constructor(private cartService: CartService) { }

}
