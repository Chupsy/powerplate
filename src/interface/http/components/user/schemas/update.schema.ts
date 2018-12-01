import { object, number, string } from 'joi';

export const userUpdateSchema = {
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
                .min(0)
                .precision(0)
                .optional()
        })
        .or('email', 'firstName', 'lastName', 'age')
};
