import { Order } from "src/order/interfaces/order.interface";

export interface User extends Document {
    readonly name: string,
    readonly email: string,
    readonly password: string,
    readonly phone: string,
    readonly gender: boolean,
    readonly cpf: string,
    readonly orders: Order[],
    readonly created_at: Date;
}