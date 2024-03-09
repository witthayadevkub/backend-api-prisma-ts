"use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var express = require("express");
var client_1 = require("@prisma/client");
var Auth = require("../middleware/auth").Auth;
var prisma = new client_1.PrismaClient();
var router = express.Router();
//current user
router.get("/user/current", Auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var currentUser, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, req.user];
            case 1:
                currentUser = _a.sent();
                return [4 /*yield*/, prisma.user.findUnique({
                        where: {
                            id: currentUser === null || currentUser === void 0 ? void 0 : currentUser.id,
                        },
                        select: {
                            id: true,
                            avatar: true,
                            name: true,
                            email: true,
                            posts: true,
                            created: true
                        }
                    })];
            case 2:
                user = _a.sent();
                return [2 /*return*/, res.json(user)];
            case 3:
                error_1 = _a.sent();
                res.status(500).json({ message: error_1 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//getAll
router.get('/user', Auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var currentUserId, allPost, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                currentUserId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                return [4 /*yield*/, prisma.user.findMany({
                        // include: {
                        //     posts: true
                        // }
                        where: {
                            id: { not: currentUserId }
                        },
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            avatar: true,
                            posts: true,
                        },
                    })];
            case 1:
                allPost = _b.sent();
                return [2 /*return*/, res.json(allPost)];
            case 2:
                error_2 = _b.sent();
                res.status(500).json({ error: error_2 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/user/test', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var allPost, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.user.findMany({
                        // include: {
                        //     posts: true
                        // }
                        where: {
                            name: "user-test"
                        },
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            avatar: true,
                            posts: true,
                        },
                    })];
            case 1:
                allPost = _a.sent();
                return [2 /*return*/, res.json(allPost)];
            case 2:
                error_3 = _a.sent();
                res.status(500).json({ error: error_3 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//getUsetById
router.get("/user/:id", Auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.params.id;
                return [4 /*yield*/, prisma.user.findUnique({
                        where: { id: userId, },
                        // include: { posts: true }
                        select: {
                            id: true,
                            avatar: true,
                            name: true,
                            email: true,
                            posts: {
                                orderBy: {
                                    created: 'desc'
                                }
                            },
                            // posts: {
                            //     select:{
                            //         author: true,
                            //     }
                            // },
                            // created: true
                        },
                    })];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.json(user)];
            case 2:
                error_4 = _a.sent();
                res.status(500).json({ error: error_4 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//update name user
router.put('/user/:id', Auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, name_1, updateUser, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                name_1 = req.body.name;
                return [4 /*yield*/, prisma.user.update({
                        where: { id: id },
                        data: { name: name_1 }
                    })];
            case 1:
                updateUser = _a.sent();
                return [2 /*return*/, res.status(200).json(updateUser)];
            case 2:
                error_5 = _a.sent();
                res.status(500).json({ error: error_5 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.delete('/user/:id', Auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, prisma.user.delete({
                        where: { id: id }
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: "User deleted successfully" })];
            case 2:
                error_6 = _a.sent();
                res.status(500).json({ at: "delete user", error: error_6 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
