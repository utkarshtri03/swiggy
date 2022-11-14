import { Address } from "./address.model";
import { Item } from "./item.model";
import { Restaurant } from "./restaurant.model";

export class Cart {
    constructor(
        public restaurant: Restaurant,
        public items: Item[],
        public totalItem?: number,
        public totalPrice?: number,
        public grandTotal?: number,
        public location?: Address,
        public deliveryCharge?: number
    ) {}
}