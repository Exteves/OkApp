export class CreateProductDTO {
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly enabled: Boolean;
    readonly spotlight: Boolean;
    readonly created_at: Date;
}