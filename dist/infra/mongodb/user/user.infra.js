"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const inversify_1 = require("inversify");
exports.UserSchema = new mongoose.Schema({
    userId: { type: Number, required: true, unique: true, min: 0 },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    passwordSalt: { type: String, required: true },
    email: { type: String, required: 'email_already_used', unique: true, trim: true, lowercase: true },
    age: { type: Number, required: true, min: 0 }
});
let UserInfra = class UserInfra {
    init(db) {
        this.User = db.model('User', exports.UserSchema);
    }
    async findUserById(userId) {
        return this.convertDocumentToIUser(await this.User.findOne({ userId }));
    }
    async findAllUsers() {
        let users = await this.User.find();
        return users.map(user => this.convertDocumentToIUser(user));
    }
    async deleteUserById(userId) {
        await this.User.findOneAndDelete({ userId });
    }
    async createUser(userToCreate) {
        let maxUserDocument = await this.User.findOne().sort('-userId');
        let maxUser = maxUserDocument.toObject();
        return this.convertDocumentToIUser(await this.User.create(Object.assign({ userId: maxUser ? maxUser.userId + 1 : 1 }, userToCreate)));
    }
    async updateUser(userId, dataToUpdate) {
        await this.User.findOneAndUpdate({ userId }, dataToUpdate);
        return this.convertDocumentToIUser(await this.User.findOne({ userId }));
    }
    async findUserByEmail(email) {
        return this.convertDocumentToIUser(await this.User.findOne({ email }));
    }
    convertDocumentToIUser(user) {
        if (!user) {
            return null;
        }
        let convertedUser = user.toObject();
        return {
            userId: convertedUser.userId,
            email: convertedUser.email,
            firstName: convertedUser.firstName,
            lastName: convertedUser.lastName,
            age: convertedUser.age,
            password: convertedUser.password,
            passwordSalt: convertedUser.passwordSalt
        };
    }
};
UserInfra = __decorate([
    inversify_1.injectable()
], UserInfra);
exports.UserInfra = UserInfra;
