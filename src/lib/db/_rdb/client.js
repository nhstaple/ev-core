"use strict";
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
exports.__esModule = true;
exports.init_rethink = void 0;
var r = require("rethinkdb");
var Rethink = /** @class */ (function () {
    /** DEFAULT CONSTRUCTOR */
    function Rethink(credentials) {
        if (!credentials) {
            // eslint-disable-next-line functional/no-throw-statement
            throw new Error('Invalid db credentials!');
        }
        this.credentials = credentials;
        this.connect(this.credentials, true);
    }
    /** PRIVATE METHODS */
    Rethink.prototype._validateConnection = function () {
        if (this._conn == null) {
            // eslint-disable-next-line functional/no-throw-statement
            throw new Error('Attempting to query with a unconnected db client');
            return false;
        }
        return true;
    };
    // eslint-disable-next-line functional/no-return-void
    Rethink.prototype._closeConnection = function (wait) {
        var _this = this;
        if (this._conn != null) {
            this._conn.close({ noreplyWait: wait }, function (err) {
                if (err) {
                    // eslint-disable-next-line functional/no-throw-statement
                    throw err;
                }
                else {
                    _this._conn = null;
                }
            });
        }
    };
    /** PUBLIC METHODS */
    Rethink.prototype.connect = function (credentials, force) {
        return __awaiter(this, void 0, void 0, function () {
            var options;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this._conn == null || force)) return [3 /*break*/, 2];
                        if (this._conn != null) {
                            if (force) {
                                console.log('Forcing a new connection from:');
                                console.log(this._conn);
                                console.log('to:');
                                console.log(credentials);
                            }
                            // close the current connection
                            this._closeConnection(true);
                        }
                        options = {
                            'host': credentials.host,
                            'port': credentials.port,
                            'db': credentials.db,
                            'user': credentials.user,
                            'password': credentials.password,
                            'timeout': credentials.timeout,
                            'ssl': credentials.ssl
                        };
                        // connect to rethink
                        return [4 /*yield*/, r.connect(options, function (err, conn) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    // eslint-disable-next-line functional/no-throw-statement
                                    if (err) {
                                        throw err;
                                    }
                                    this._conn = conn;
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1:
                        // connect to rethink
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2: 
                    // eslint-disable-next-line functional/no-throw-statement
                    throw new Error('Database client already has a connection! Try setting the force flag.');
                    case 3: return [2 /*return*/, true];
                }
            });
        });
    };
    // eslint-disable-next-line functional/prefer-readonly-type
    Rethink.prototype.query = function (table) {
        return __awaiter(this, void 0, void 0, function () {
            var p, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._validateConnection()) {
                            // eslint-disable-next-line functional/no-throw-statement
                            throw new Error('Attempting to query with a unconnected db client');
                            return [2 /*return*/, []];
                        }
                        p = r.db(this.credentials.db).table(table).run(this._conn);
                        return [4 /*yield*/, p.then(function (curs) {
                                return curs.toArray().then(function (results) {
                                    return results;
                                });
                            })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/ban-types
    Rethink.prototype.insert = function (table, row) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                this._validateConnection();
                r.table(table).insert(row).run(this._conn, function (err, data) {
                    if (err) {
                        // eslint-disable-next-line functional/no-throw-statement
                        throw err;
                        res = false;
                    }
                    else {
                        console.log(data);
                        res = true;
                    }
                });
                if (res) {
                    return [2 /*return*/, true];
                }
                else {
                    return [2 /*return*/, false];
                }
                return [2 /*return*/];
            });
        });
    };
    Rethink.prototype.update = function (table, item, attribute) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._validateConnection()) {
                            // eslint-disable-next-line functional/no-throw-statement
                            throw new Error('Attempting to query with an invalid db connection');
                            return [2 /*return*/, false];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, r.db(this.credentials.db).table(table).filter({
                                'id': item.uuid
                            }).update(attribute).run(this._conn, function () {
                                return;
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3:
                        err_1 = _a.sent();
                        console.log('Error updating!');
                        console.log(err_1);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // eslint-disable-next-line functional/prefer-readonly-type
    Rethink.prototype.deleteItem = function (table, uuid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this._validateConnection()) {
                    // eslint-disable-next-line functional/no-throw-statement
                    throw new Error('Attempting to delete an item with an invalid db connection');
                    return [2 /*return*/, false];
                }
                // eslint-disable-next-line functional/no-throw-statement
                throw new Error('Not implemented!');
            });
        });
    };
    Rethink.prototype.createUUID = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var ID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, r.uuid(name).run(this._conn, function (err, res) {
                            if (err) {
                                console.log('Error creating UUID on: ' + name);
                                // eslint-disable-next-line functional/no-throw-statement
                                throw err;
                            }
                            else {
                                ID = res;
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, ID];
                }
            });
        });
    };
    // eslint-disable-next-line functional/prefer-readonly-type
    Rethink.prototype.getVocab = function (table, uuid, callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // eslint-disable-next-line functional/no-throw-statement
                throw new Error('Not implemented!');
            });
        });
    };
    // eslint-disable-next-line functional/prefer-readonly-type
    Rethink.prototype.getCollection = function (table, uuid, callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // eslint-disable-next-line functional/no-throw-statement
                throw new Error('Not implemented!');
            });
        });
    };
    // eslint-disable-next-line functional/prefer-readonly-type
    Rethink.prototype.getVocab_lw = function (table, uuid, callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // eslint-disable-next-line functional/no-throw-statement
                throw new Error('Not implemented!');
            });
        });
    };
    // eslint-disable-next-line functional/prefer-readonly-type
    Rethink.prototype.getCollection_lw = function (table, uuid, callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // eslint-disable-next-line functional/no-throw-statement
                throw new Error('Not implemented!');
            });
        });
    };
    return Rethink;
}());
// eslint-disable-next-line no-var
var client;
function init_rethink(credentials) {
    client = new Rethink(credentials);
    console.log(credentials);
    return client;
}
exports.init_rethink = init_rethink;
