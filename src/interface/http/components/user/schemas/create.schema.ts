import { object, number, string } from 'joi';

export const userCreateSchema = {
    body: object().keys({
        email: string()
            .email()
            .required(),
        firstName: string()
            .min(2)
            .required(),
        lastName: string()
            .min(2)
            .required(),
        age: number()
            .min(0)
            .precision(0)
            .required()
    })
};
