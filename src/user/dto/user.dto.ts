export class CreateUserDTO {
    readonly name: string;
    readonly email: string
    readonly password: string;
    readonly phone: string;
    readonly gender: boolean;
    readonly cpf: string;
    readonly created_at: Date;
}