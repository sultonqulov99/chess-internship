import { Register } from "src/auth/schema/register.schema";

export enum UserRole{
    ADMIN = 'ADMIN',
    STUDENT = 'USER',
    SUPER_ADMIN = 'SUPER_ADMIN'
}

export type TAuthUser = Omit<Register, 'password'>