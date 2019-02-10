"use strict";
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
                return formatObjectForModel(Object.assign({}, data, opt));
            },
            create: function (data) {
                return formatObjectForModel(data);
            }
        };
    }
};
function formatObjectForModel(data) {
    let token = Object.assign({}, data, { sort: () => token, toObject: () => {
            if (exports.modelMock.shouldReturnUserFindOne) {
                return data;
            }
            exports.modelMock.shouldReturnUserFindOne = true;
            return null;
        } });
    return token;
}
