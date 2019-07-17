import { Product } from "src/product/interfaces/product.interface";

export class CreateOrderDTO {
    readonly coupon: string;
    readonly products: Product[];
}