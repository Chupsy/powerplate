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
                if (!opt || opt.userId === 1 || opt.email === 'email@user.com') {
                    return formatObjectForModel({
                        email: 'email@user.com',
                        userId: 1
                    });
                }
                return null;
            },
            find: function (opt) {
                return [
                    formatObjectForModel({
                        userId: 1
                    })
                ];
            },
            findOneAndDelete: function (opt) {
                return;
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
    var user = __assign({}, data, { sort: function () { return user; }, toObject: function () {
            if (exports.modelMock.shouldReturnUserFindOne) {
                return data;
            }
            exports.modelMock.shouldReturnUserFindOne = true;
            return null;
        } });
    return user;
}
