import { Product } from "dist/product/interfaces/product.interface";

export class CreateStockDTO {
    readonly size: string;
    readonly gender: Boolean;
    readonly qtt: Number;
    readonly products: Product[];
    readonly created_at: Date;
}