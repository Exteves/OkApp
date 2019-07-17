import { Product } from "src/product/interfaces/product.interface";

export interface Order extends Document {
    readonly coupon: string;
    readonly products: Product[];
    readonly created_at: Date;
}