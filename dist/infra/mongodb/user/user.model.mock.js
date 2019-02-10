"use strict";
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
                return formatObjectForModel(Object.assign({}, data, opt));
            },
            create: function (data) {
                return formatObjectForModel(data);
            }
        };
    }
};
function formatObjectForModel(data) {
    let user = Object.assign({}, data, { sort: () => user, toObject: () => {
            if (exports.modelMock.shouldReturnUserFindOne) {
                return data;
            }
            exports.modelMock.shouldReturnUserFindOne = true;
            return null;
        } });
    return user;
}
