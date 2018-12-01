import { interfaces, httpGet, controller, requestParam, httpPost, request, response } from "inversify-express-utils";
import { inject } from "inversify";
import APP_IDENTIFIERS from "../../../../app/identifiers";
import UserApp, { IUser } from "../../../../app/user/user.app";
import { celebrate, errors } from "celebrate";
import { getUserByIdSchema, createUserSchema } from "./schemas/basic.schema";
import express = require("express");

@controller("/users")
export class UserController implements interfaces.Controller {
    constructor(@inject(APP_IDENTIFIERS.UserApp) private userApp: UserApp) {}

    @httpGet("/:id", celebrate(getUserByIdSchema), errors())
    public getUser(@requestParam("id") id: number): IUser {
        return this.userApp.proceed(id);
    }

    @httpPost("/", celebrate(createUserSchema), errors())
    public createUser(@request() req: express.Request, @response() res: express.Response): IUser {
        return this.userApp.createUser(req.body);
    }
}
