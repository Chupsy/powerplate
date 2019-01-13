export const modelMock = {
    shouldReturnUserFindOne: true,
    model: function(modelName: any, schema: any): any {
        return {
            findOne: function(opt: any) {
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
            findOneAndUpdate: function(opt: any, data: any) {
                return formatObjectForModel({
                    ...data,
                    ...opt
                });
            },
            create: function(data: any) {
                return formatObjectForModel(data);
            }
        };
    }
};

function formatObjectForModel(data: any) {
    let token = {
        ...data,
        sort: () => token,
        toObject: () => {
            if (modelMock.shouldReturnUserFindOne) {
                return data;
            }
            modelMock.shouldReturnUserFindOne = true;
            return null;
        }
    };
    return token;
}
