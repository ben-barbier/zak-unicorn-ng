import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Unicorn} from '../../../shared/models/unicorn.model';
import {CartService} from '../../../shared/services/cart.service';

@Component({
    selector: 'app-unicorn-card',
    templateUrl: './unicorn-card.component.html',
    styleUrls: ['./unicorn-card.component.scss']
})
export class UnicornCardComponent {

    @Input()
    public unicorn: Unicorn;

    @Output()
    public removed = new EventEmitter<void>();

    public isInCart = false;

    constructor(private cartService: CartService) {
        this.cartService.cart$.subscribe(cart => {
            this.isInCart = this.cartService.isInCart(this.unicorn);
        });
    }

    public setNameToUppercase() {
        this.unicorn = {...this.unicorn, name: this.unicorn.name.toUpperCase()};
    }

    public delete() {
        this.removed.emit();
    }

    public toggleToCart() {
        if (this.cartService.isInCart(this.unicorn)) {
            this.cartService.removeFromCart(this.unicorn);
        } else {
            this.cartService.addToCart(this.unicorn);
        }
    }


}
