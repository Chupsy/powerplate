export const modelMock = {
    shouldReturnUserFindOne: true,
    model: function(modelName: any, schema: any): any {
        return {
            findOne: function(opt: any) {
                if (!opt || opt.userId === 1 || opt.email === 'email@user.com') {
                    return formatObjectForModel({
                        email: 'email@user.com',
                        userId: 1
                    });
                }
                return null;
            },
            find: function(opt?: any) {
                return [
                    formatObjectForModel({
                        userId: 1
                    })
                ];
            },
            findOneAndDelete: function(opt: any) {
                return;
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
    let user = {
        ...data,
        sort: () => user,
        toObject: () => {
            if (modelMock.shouldReturnUserFindOne) {
                return data;
            }
            modelMock.shouldReturnUserFindOne = true;
            return null;
        }
    };
    return user;
}
