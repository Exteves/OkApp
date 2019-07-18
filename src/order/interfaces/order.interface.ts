import { Product } from "src/product/interfaces/product.interface";
import { User } from "src/user/interfaces/user.interface";

export interface Order extends Document {
    readonly coupon: string;
    readonly products: Product[];
    readonly user: User;
    readonly created_at: Date;
}