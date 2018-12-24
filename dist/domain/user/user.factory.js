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
var identifiers_1 = require("../../infra/mongodb/identifiers");
var user_infra_1 = require("../../infra/mongodb/user/user.infra");
var UserFactory = /** @class */ (function () {
    function UserFactory(userInfra) {
        this.userInfra = userInfra;
    }
    UserFactory.prototype.findUserById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var foundUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userInfra.findUserById(userId)];
                    case 1:
                        foundUser = _a.sent();
                        if (!foundUser) {
                            throw new Error('data_not_found');
                        }
                        return [2 /*return*/, foundUser];
                }
            });
        });
    };
    UserFactory.prototype.findAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userInfra.findAllUsers()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserFactory.prototype.deleteUserById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var foundUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userInfra.findUserById(userId)];
                    case 1:
                        foundUser = _a.sent();
                        if (!foundUser) {
                            throw new Error('data_not_found');
                        }
                        return [4 /*yield*/, this.userInfra.deleteUserById(userId)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserFactory.prototype.createUser = function (userToCreate) {
        return __awaiter(this, void 0, void 0, function () {
            var createdUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.verifyEmail(userToCreate.email)];
                    case 1:
                        _a.sent();
                        if (userToCreate.age <= 0) {
                            throw new Error('invalid_age');
                        }
                        return [4 /*yield*/, this.userInfra.createUser(__assign({}, userToCreate))];
                    case 2:
                        createdUser = _a.sent();
                        return [2 /*return*/, createdUser];
                }
            });
        });
    };
    UserFactory.prototype.updateUser = function (userId, dataToUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            var foundUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userInfra.findUserById(userId)];
                    case 1:
                        foundUser = _a.sent();
                        if (!foundUser) {
                            throw new Error('data_not_found');
                        }
                        if (dataToUpdate.age <= 0) {
                            throw new Error('invalid_age');
                        }
                        if (!dataToUpdate.email) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.verifyEmail(dataToUpdate.email, userId)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.userInfra.updateUser(userId, dataToUpdate)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserFactory.prototype.verifyEmail = function (email, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userInfra.findUserByEmail(email)];
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
    UserFactory = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(identifiers_1.default.UserInfra)),
        __metadata("design:paramtypes", [user_infra_1.UserInfra])
    ], UserFactory);
    return UserFactory;
}());
exports.default = UserFactory;
