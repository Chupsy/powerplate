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
var mongoose = require("mongoose");
var inversify_1 = require("inversify");
exports.UserSchema = new mongoose.Schema({
    userId: { type: Number, required: true, unique: true, min: 0 },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: 'email_already_used', unique: true, trim: true, lowercase: true },
    age: { type: Number, required: true, min: 0 }
});
var UserInfra = /** @class */ (function () {
    function UserInfra() {
        this.User = mongoose.model('User', exports.UserSchema);
    }
    UserInfra.prototype.findUserById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.convertDocumentToIUser;
                        return [4 /*yield*/, this.User.findOne({ userId: userId })];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                }
            });
        });
    };
    UserInfra.prototype.findAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.User.find()];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users.map(function (user) { return _this.convertDocumentToIUser(user); })];
                }
            });
        });
    };
    UserInfra.prototype.deleteUserById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.User.findOneAndDelete({ userId: userId })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserInfra.prototype.createUser = function (userToCreate) {
        return __awaiter(this, void 0, void 0, function () {
            var maxUserDocument, maxUser, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.User.findOne().sort('-userId')];
                    case 1:
                        maxUserDocument = _b.sent();
                        maxUser = maxUserDocument.toObject();
                        _a = this.convertDocumentToIUser;
                        return [4 /*yield*/, this.User.create(__assign({ userId: maxUser ? maxUser.userId + 1 : 1 }, userToCreate))];
                    case 2: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                }
            });
        });
    };
    UserInfra.prototype.updateUser = function (userId, dataToUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.convertDocumentToIUser;
                        return [4 /*yield*/, this.User.findOneAndUpdate({ userId: userId }, dataToUpdate)];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                }
            });
        });
    };
    UserInfra.prototype.findUserByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.convertDocumentToIUser;
                        return [4 /*yield*/, this.User.findOne({ email: email })];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                }
            });
        });
    };
    UserInfra.prototype.convertDocumentToIUser = function (user) {
        if (!user) {
            return null;
        }
        var convertedUser = user.toObject();
        return {
            userId: convertedUser.userId,
            email: convertedUser.email,
            firstName: convertedUser.firstName,
            lastName: convertedUser.lastName,
            age: convertedUser.age
        };
    };
    UserInfra = __decorate([
        inversify_1.injectable()
    ], UserInfra);
    return UserInfra;
}());
exports.UserInfra = UserInfra;
