import { Order } from "src/order/interfaces/order.interface";

export interface User extends Document {
    readonly name: string,
    readonly email: string,
    readonly orders: Order[],
    readonly password: string,
    readonly phone: string,
    readonly gender: boolean,
    readonly cpf: string,
    readonly created_at: Date;
}