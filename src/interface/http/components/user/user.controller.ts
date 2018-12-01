import { interfaces, httpGet, controller, requestParam, response } from 'inversify-express-utils';
import { inject } from 'inversify';
import APP_IDENTIFIERS from '../../../../app/identifiers';
import { celebrate, errors } from 'celebrate';
import express = require('express');
import { userFindOneSchema } from './schemas/read.schema';
import responseNormalizer from '../../helpers/response_normalizer';
import UserApp from '../../../../app/user/user.app';

@controller('/users')
export class UserController implements interfaces.Controller {
    constructor(@inject(APP_IDENTIFIERS.UserApp) private userApp: UserApp) {}

    @httpGet('/:userId', celebrate(userFindOneSchema))
    public getUser(@requestParam('userId') id: number, @response() res: express.Response): void {
        const user = this.userApp.findUserById(id);
        responseNormalizer(res, 'user_found', user);
    }
}
