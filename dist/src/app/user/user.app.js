"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var inversify_1 = require("inversify");
var identifiers_1 = require("../../infra/identifiers");
var user_resource_1 = require("../../infra/resources/user/user.resource");
var user_1 = require("./user");
var crypto = require("crypto");
var sha256 = require("sha256");
var strategies_1 = require("../constants/strategies");
var UserApp = /** @class */ (function () {
    function UserApp(userResource) {
        this.userResource = userResource;
    }
    UserApp.prototype.findUserById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var foundUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userResource.findUserById(userId)];
                    case 1:
                        foundUser = _a.sent();
                        if (!foundUser) {
                            throw new Error('data_not_found');
                        }
                        return [2 /*return*/, new user_1.default(this.userResource, foundUser).export()];
                }
            });
        });
    };
    UserApp.prototype.findAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userResource.findAllUsers()];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users.map(function (user) { return new user_1.default(_this.userResource, user).export(); })];
                }
            });
        });
    };
    UserApp.prototype.deleteUserById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var foundUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userResource.findUserById(userId)];
                    case 1:
                        foundUser = _a.sent();
                        if (!foundUser) {
                            throw new Error('data_not_found');
                        }
                        return [4 /*yield*/, this.userResource.deleteUserById(userId)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserApp.prototype.createUser = function (userToCreate) {
        return __awaiter(this, void 0, void 0, function () {
            var passwordSalt, createdUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.verifyEmail(userToCreate.email)];
                    case 1:
                        _a.sent();
                        if (userToCreate.age <= 0) {
                            throw new Error('invalid_age');
                        }
                        passwordSalt = crypto.randomBytes(32).toString('hex');
                        return [4 /*yield*/, this.userResource.createUser(__assign({}, userToCreate, { password: sha256(userToCreate.password + sha256(passwordSalt)), passwordSalt: passwordSalt }))];
                    case 2:
                        createdUser = _a.sent();
                        return [2 /*return*/, new user_1.default(this.userResource, createdUser).export()];
                }
            });
        });
    };
    UserApp.prototype.updateUser = function (userId, dataToUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            var foundUser, _a, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.userResource.findUserById(userId)];
                    case 1:
                        foundUser = _b.sent();
                        if (!foundUser) {
                            throw new Error('data_not_found');
                        }
                        _a = dataToUpdate.email;
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.verifyEmail(dataToUpdate.email, userId)];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3:
                        _a;
                        user = new user_1.default(this.userResource, foundUser);
                        return [4 /*yield*/, user.update(dataToUpdate)];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, user.export()];
                }
            });
        });
    };
    UserApp.prototype.verifyEmail = function (email, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userResource.findUserByEmail(email)];
                    case 1:
                        user = _a.sent();
                        if (user && (!userId || userId !== user.userId)) {
                            throw new Error('email_already_used');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserApp.prototype.authenticateUser = function (authData, strategy) {
        return __awaiter(this, void 0, void 0, function () {
            var foundUser, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(strategy === strategies_1.AUTHENTICATION_STRATEGY.LOCAL && authData.email && authData.password)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userResource.findUserByEmail(authData.email)];
                    case 1:
                        foundUser = _a.sent();
                        if (!foundUser) {
                            throw new Error('data_not_found');
                        }
                        user = new user_1.default(this.userResource, foundUser);
                        if (!user.verifyPassword(authData.password)) {
                            throw new Error('invalid_password');
                        }
                        return [2 /*return*/, user];
                    case 2: throw new Error('invalid_parameters');
                }
            });
        });
    };
    UserApp = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(identifiers_1.default.UserResource)),
        __metadata("design:paramtypes", [user_resource_1.UserResource])
    ], UserApp);
    return UserApp;
}());
exports.default = UserApp;
