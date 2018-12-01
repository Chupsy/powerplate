import { object, number } from 'joi';

export const userFindOneSchema = {
    params: object().keys({
        userId: number().required()
    })
};
