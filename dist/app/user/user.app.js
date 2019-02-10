"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const identifiers_1 = require("../../infra/identifiers");
const user_1 = require("./user");
const crypto = require("crypto");
const sha256 = require("sha256");
const user_infra_1 = require("../../infra/mongodb/user/user.infra");
let UserApp = class UserApp {
    constructor(userInfra) {
        this.userInfra = userInfra;
    }
    async findUserById(userId) {
        const foundUser = await this.userInfra.findUserById(userId);
        if (!foundUser) {
            throw new Error('data_not_found');
        }
        return new user_1.default(this.userInfra, foundUser).export();
    }
    async findAllUsers() {
        const users = await this.userInfra.findAllUsers();
        return users.map(user => new user_1.default(this.userInfra, user).export());
    }
    async deleteUserById(userId) {
        const foundUser = await this.userInfra.findUserById(userId);
        if (!foundUser) {
            throw new Error('data_not_found');
        }
        return await this.userInfra.deleteUserById(userId);
    }
    async createUser(userToCreate) {
        await this.verifyEmail(userToCreate.email);
        if (userToCreate.age <= 0) {
            throw new Error('invalid_age');
        }
        const passwordSalt = crypto.randomBytes(32).toString('hex');
        let createdUser = await this.userInfra.createUser(Object.assign({}, userToCreate, { password: sha256(userToCreate.password + sha256(passwordSalt)), passwordSalt }));
        return new user_1.default(this.userInfra, createdUser).export();
    }
    async updateUser(userId, dataToUpdate) {
        const foundUser = await this.userInfra.findUserById(userId);
        if (!foundUser) {
            throw new Error('data_not_found');
        }
        dataToUpdate.email && (await this.verifyEmail(dataToUpdate.email, userId));
        const user = new user_1.default(this.userInfra, foundUser);
        await user.update(dataToUpdate);
        return user.export();
    }
    async verifyEmail(email, userId) {
        let user = await this.userInfra.findUserByEmail(email);
        if (user && (!userId || userId !== user.userId)) {
            throw new Error('email_already_used');
        }
    }
    async findUserByEmail(email) {
        let foundUser = await this.userInfra.findUserByEmail(email);
        if (!foundUser) {
            throw new Error('data_not_found');
        }
        return new user_1.default(this.userInfra, foundUser);
    }
};
UserApp = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(identifiers_1.default.UserInfra)),
    __metadata("design:paramtypes", [user_infra_1.UserInfra])
], UserApp);
exports.default = UserApp;
