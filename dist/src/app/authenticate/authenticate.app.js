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
var identifiers_1 = require("../../infra/identifiers");
var oauth2_token_resource_1 = require("../../infra/resources/oauth2_token/oauth2_token.resource");
var strategies_1 = require("../constants/strategies");
var user_app_1 = require("../user/user.app");
var identifiers_2 = require("../identifiers");
var moment = require("moment");
var crypto = require("crypto");
var jwt = require("jsonwebtoken");
var AuthenticateApp = /** @class */ (function () {
    function AuthenticateApp(userApp, oauth2TokenResource) {
        this.userApp = userApp;
        this.oauth2TokenResource = oauth2TokenResource;
    }
    AuthenticateApp.prototype.authenticateByStrategy = function (authData, strategy) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(strategy === strategies_1.AUTHENTICATION_STRATEGY.LOCAL && authData.email && authData.password)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.authenticateByPassword(authData.email, authData.password)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    // public async refreshBearer(bearerToken: string) {}
    AuthenticateApp.prototype.cancelBearer = function (bearerToken) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    AuthenticateApp.prototype.authenticateByPassword = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userApp.findUserByEmail(email)];
                    case 1:
                        user = _a.sent();
                        if (!user.verifyPassword(password)) {
                            throw new Error('invalid_password');
                        }
                        return [4 /*yield*/, this.generateBearer(user)];
                    case 2:
                        token = _a.sent();
                        return [2 /*return*/, {
                                user: user.export(),
                                token: token
                            }];
                }
            });
        });
    };
    AuthenticateApp.prototype.authenticateByBearer = function (bearerToken) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    AuthenticateApp.prototype.generateBearer = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = {
                            accessToken: crypto.randomBytes(32).toString('hex'),
                            refreshToken: crypto.randomBytes(32).toString('hex'),
                            accessTokenExpirationDate: moment()
                                .add(1, 'day')
                                .toDate(),
                            userId: user.userId,
                            rememberMe: false
                        };
                        return [4 /*yield*/, this.oauth2TokenResource.createToken(token)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, jwt.sign(token, 'config.secretJWT')];
                }
            });
        });
    };
    AuthenticateApp = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(identifiers_2.default.UserApp)),
        __param(1, inversify_1.inject(identifiers_1.default.Oauth2TokenResource)),
        __metadata("design:paramtypes", [user_app_1.default,
            oauth2_token_resource_1.Oauth2TokenResource])
    ], AuthenticateApp);
    return AuthenticateApp;
}());
exports.AuthenticateApp = AuthenticateApp;
