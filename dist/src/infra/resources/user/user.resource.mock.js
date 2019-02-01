"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const sha256 = require("sha256");
let UserResourceMock = class UserResourceMock {
    async findUserById(userId) {
        if (userId !== 1) {
            return null;
        }
        return {
            userId: 1,
            firstName: 'fName',
            lastName: 'lName',
            age: 12,
            email: 'valid@user.com',
            password: sha256('azerty' + sha256('1234AZER')),
            passwordSalt: '1234AZER'
        };
    }
    async findAllUsers() {
        return [
            {
                userId: 1
            },
            {
                userId: 2
            }
        ];
    }
    async deleteUserById() {
        return;
    }
    async createUser(userToCreate) {
        return Object.assign({ userId: 1 }, userToCreate);
    }
    async updateUser(userId, dataToUpdate) {
        return Object.assign({ userId, firstName: 'fName', lastName: 'lName', age: 12, email: 'valid@user.com', password: sha256('azerty' + sha256('1234AZER')), passwordSalt: '1234AZER' }, dataToUpdate);
    }
    async findUserByEmail(email) {
        if (email === 'email@already.used') {
            return {
                userId: 5,
                firstName: 'fName',
                lastName: 'lName',
                age: 12,
                email: 'email@already.used',
                password: sha256('azerty' + sha256('1234AZER')),
                passwordSalt: '1234AZER'
            };
        }
        return null;
    }
};
UserResourceMock = __decorate([
    inversify_1.injectable()
], UserResourceMock);
exports.default = UserResourceMock;
