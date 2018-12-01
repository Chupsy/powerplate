import { object, number } from 'joi';

export const userDeleteSchema = {
    params: object().keys({
        userId: number().required()
    })
};
