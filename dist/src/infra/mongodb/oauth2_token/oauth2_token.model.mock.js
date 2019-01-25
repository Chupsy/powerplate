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
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelMock = {
    shouldReturnUserFindOne: true,
    model: function (modelName, schema) {
        return {
            findOne: function (opt) {
                if (opt.userId === 1) {
                    return formatObjectForModel({
                        accessToken: 'azerty',
                        accessTokenExpirationDate: new Date(),
                        refreshToken: 'azerty',
                        rememberMe: true,
                        userId: 1
                    });
                }
                return null;
            },
            findOneAndUpdate: function (opt, data) {
                return formatObjectForModel(__assign({}, data, opt));
            },
            create: function (data) {
                return formatObjectForModel(data);
            }
        };
    }
};
function formatObjectForModel(data) {
    var token = __assign({}, data, { sort: function () { return token; }, toObject: function () {
            if (exports.modelMock.shouldReturnUserFindOne) {
                return data;
            }
            exports.modelMock.shouldReturnUserFindOne = true;
            return null;
        } });
    return token;
}
