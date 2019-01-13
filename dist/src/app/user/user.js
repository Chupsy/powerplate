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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var sha256 = require("sha256");
var user_resource_1 = require("../../infra/resources/user/user.resource");
var User = /** @class */ (function () {
    function User(userResource, userData) {
        this.updateData(userData);
        this.userResource = userResource;
    }
    User.prototype.update = function (dataToUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
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
                        return [4 /*yield*/, this.userResource.updateUser(this.userId, dataToUpdate)];
                    case 1:
                        updatedData = _a.sent();
                        this.updateData(updatedData);
                        return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.export = function () {
        return {
            userId: this.userId,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            age: this.age
        };
    };
    User.prototype.verifyPassword = function (password) {
        return this.password === sha256(password + sha256(this.passwordSalt));
    };
    User.prototype.updateData = function (userData) {
        this.userId = userData.userId;
        this.email = userData.email;
        this.firstName = userData.firstName;
        this.lastName = userData.lastName;
        this.password = userData.password;
        this.passwordSalt = userData.passwordSalt;
        this.age = userData.age;
    };
    User = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [user_resource_1.UserResource, Object])
    ], User);
    return User;
}());
exports.default = User;
