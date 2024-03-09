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
var fs_1 = require("fs");
//middleware
var Auth = require("../middleware/auth").Auth;
//upload post image
var upload = require("../middleware/upload").upload;
var prisma = new client_1.PrismaClient();
var router = express.Router();
//getAll
router.get('/post', Auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var allPost, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma.post.findMany({
                        include: {
                            author: true
                        },
                        orderBy: {
                            created: 'desc' // Assuming createdAt is the name of the column representing the creation date
                        }
                    })];
            case 1:
                allPost = _a.sent();
                return [2 /*return*/, res.json(allPost)];
            case 2:
                error_1 = _a.sent();
                res.status(500).json({ error: error_1 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//getById
router.get('/post/:id', Auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, getById, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, prisma.post.findUnique({
                        where: { id: id }
                    })];
            case 1:
                getById = _a.sent();
                if (!getById) {
                    return [2 /*return*/, res.status(404).json({ message: 'post not found' })];
                }
                return [2 /*return*/, res.json(getById)];
            case 2:
                error_2 = _a.sent();
                res.status(500).json({ error: error_2 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//create
// {
//         "authorId": "cltexp5tf000012u3haw99530",
//         "title": "new title",
//         "content": "new content"
//         "picture": ""
// }
router.post('/post', Auth, upload.single('picture'), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, authorId, title, content, picture, newPost, post, error_3;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                _a = req.body, authorId = _a.authorId, title = _a.title, content = _a.content;
                picture = (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename;
                newPost = {
                    authorId: authorId,
                    title: title,
                    content: content,
                    picture: picture
                };
                return [4 /*yield*/, prisma.post.create({
                        data: __assign({}, newPost)
                    })];
            case 1:
                post = _c.sent();
                res.json(post);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _c.sent();
                console.error(error_3);
                res.sendStatus(500).json({ message: error_3 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.put('/post/:id', Auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, content, id, edit, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, title = _a.title, content = _a.content;
                id = req.params.id;
                if (!title || !content) {
                    return [2 /*return*/, res.status(404).json({ message: "must title,content require" })];
                }
                return [4 /*yield*/, prisma.post.update({
                        where: { id: id },
                        data: { title: title, content: content }
                    })];
            case 1:
                edit = _b.sent();
                return [2 /*return*/, res.json(edit)];
            case 2:
                error_4 = _b.sent();
                res.status(500).json({ at: "update post", error: error_4 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.delete('/post/:id', Auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, remove, filePath, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, prisma.post.delete({
                        where: { id: id },
                    })
                    //delete post image from path and database
                ];
            case 1:
                remove = _a.sent();
                filePath = "./images/post-images/".concat(remove.picture);
                if (remove.picture) {
                    fs_1.default.unlink(filePath, function (err) {
                        if (err) {
                            console.error("Error deleting file:", err);
                            return;
                        }
                        console.log("File deleted successfully");
                    });
                }
                return [2 /*return*/, res.json({ value: "delete successfully" })];
            case 2:
                error_5 = _a.sent();
                res.status(500).json({ error: error_5 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
