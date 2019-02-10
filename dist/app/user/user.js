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
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const sha256 = require("sha256");
const user_infra_1 = require("../../infra/mongodb/user/user.infra");
let User = class User {
    constructor(userInfra, userData) {
        this.updateData(userData);
        this.userInfra = userInfra;
    }
    async update(dataToUpdate) {
        if (dataToUpdate.age <= 0) {
            throw new Error('invalid_age');
        }
        if (dataToUpdate.password) {
            if (!dataToUpdate.oldPassword) {
                throw new Error('missing_parameters');
            }
            if (!this.verifyPassword(dataToUpdate.oldPassword)) {
                throw new Error('invalid_old_password');
            }
            dataToUpdate.password = sha256(dataToUpdate.password + sha256(this.passwordSalt));
            delete dataToUpdate.oldPassword;
        }
        const updatedData = await this.userInfra.updateUser(this.userId, dataToUpdate);
        this.updateData(updatedData);
    }
    export() {
        return {
            userId: this.userId,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            age: this.age
        };
    }
    verifyPassword(password) {
        return this.password === sha256(password + sha256(this.passwordSalt));
    }
    updateData(userData) {
        this.userId = userData.userId;
        this.email = userData.email;
        this.firstName = userData.firstName;
        this.lastName = userData.lastName;
        this.password = userData.password;
        this.passwordSalt = userData.passwordSalt;
        this.age = userData.age;
    }
};
User = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [user_infra_1.UserInfra, Object])
], User);
exports.default = User;
