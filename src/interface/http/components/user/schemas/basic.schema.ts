import { object, number, string } from "joi";

export const getUserByIdSchema = {
    params: object().keys({
        id: number().required()
    })
};

export const createUserSchema = {
    body: object().keys({
        age: number()
            .positive()
            .required(),
        name: string().required()
    })
};
