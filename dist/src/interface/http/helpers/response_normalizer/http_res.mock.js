"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function resMock() {
    let rm = {
        cb: null,
        statusNumber: null,
        registerCallback: function (cb) {
            rm.cb = cb;
        },
        status: function (status) {
            rm.statusNumber = status;
            return rm;
        },
        json: function (data) {
            if (rm.cb) {
                rm.cb(data, rm.statusNumber);
            }
        }
    };
    return rm;
}
exports.default = resMock;
