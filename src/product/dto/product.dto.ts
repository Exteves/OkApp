export class CreateProductDTO {
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly enabled?: boolean;
    readonly spotlight?: boolean;
}