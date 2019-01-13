import { object, number, string } from 'joi';

export const userUpdateSchema = {
    params: object()
        .keys({
            userId: number().required()
        })
        .required(),
    body: object()
        .keys({
            email: string()
                .email()
                .optional(),
            firstName: string()
                .min(2)
                .optional(),
            lastName: string()
                .min(2)
                .optional(),
            age: number()
                .min(1)
                .precision(0)
                .optional(),
            password: string()
                .min(6)
                .optional(),
            oldPassword: string().optional()
        })
        .or('email', 'firstName', 'lastName', 'age', 'password')
        .with('password', 'oldPassword')
};
