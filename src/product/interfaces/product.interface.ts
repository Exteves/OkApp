export interface Product extends Document {
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly size: string;
    readonly enabled: boolean;
    readonly spotlight: boolean;
    readonly created_at: Date;
}