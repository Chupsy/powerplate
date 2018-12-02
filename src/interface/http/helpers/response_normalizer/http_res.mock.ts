export default function resMock(): ResMock {
    let rm: ResMock = {
        cb: null,
        statusNumber: null,
        registerCallback: function(cb: any) {
            rm.cb = cb;
        },
        status: function(status: number) {
            rm.statusNumber = status;
            return rm;
        },
        json: function(data: any) {
            if (rm.cb) {
                rm.cb(data, rm.statusNumber);
            }
        }
    };
    return rm;
}

interface ResMock {
    cb: any;
    statusNumber: any;
    registerCallback: any;
    status: any;
    json: any;
}
