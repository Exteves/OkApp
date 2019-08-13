import { Product } from "src/product/interfaces/product.interface";

export interface Stock extends Document {
    readonly gender: boolean;
    readonly qtt: number;
    readonly size: string;
    readonly product: Product;
    readonly created_at: Date;
}