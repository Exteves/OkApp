export interface Product extends Document {
    readonly gender: boolean;
    readonly qtt: number;
    readonly size: string;
    readonly products: Product[];
    readonly created_at: Date;
}