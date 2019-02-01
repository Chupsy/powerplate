"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
let UserAppMock = class UserAppMock {
    async findUserById(userId) {
        if (userId !== 1) {
            throw new Error('data_not_found');
        }
        return {
            userId: 1
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
        return Object.assign({ userId }, dataToUpdate);
    }
    async verifyEmail() {
        return null;
    }
    async authenticateUser(authData, strategy) {
        if (authData.email !== 'test@test.com') {
            throw new Error('data_not_found');
        }
        if (authData.password !== 'azerty') {
            throw new Error('invalid_password');
        }
        return {
            userId: 1,
            email: 'test@test.com',
            age: 12
        };
    }
    async findUserByEmail(email) {
        if (email === 'valid@email.com') {
            return {
                userId: 1,
                verifyPassword: function (password) {
                    if (password === 'valid') {
                        return true;
                    }
                    return false;
                },
                export: function () {
                    return {
                        userId: 1
                    };
                }
            };
        }
        throw new Error('data_not_found');
    }
};
UserAppMock = __decorate([
    inversify_1.injectable()
], UserAppMock);
exports.UserAppMock = UserAppMock;
