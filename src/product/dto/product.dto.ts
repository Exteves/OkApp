export class CreateProductDTO {
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly size: string;
    readonly enabled: Boolean;
    readonly created_at: Date;
}