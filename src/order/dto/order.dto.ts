import { Product } from "src/product/interfaces/product.interface";
import { User } from "src/user/interfaces/user.interface";

export class CreateOrderDTO {
    readonly coupon: string;
    readonly products: Product[];
    readonly user: User;
}