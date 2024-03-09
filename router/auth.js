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
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var prisma = new client_1.PrismaClient();
var router = express.Router();
router.post('/register', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, username, checkUser, photoBoy, salt, hashedPassword, newUser, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, email = _a.email, password = _a.password, username = _a.username;
                return [4 /*yield*/, prisma.user.findUnique({
                        where: { email: email }
                    })];
            case 1:
                checkUser = _b.sent();
                photoBoy = "https://avatar.iran.liara.run/public/boy?username=".concat(username);
                // const photogirl = `https://avatar.iran.liara.run/public/girl?username=${username}`;
                if (checkUser) {
                    return [2 /*return*/, res.json({ message: "user already go login" })];
                }
                return [4 /*yield*/, bcrypt.genSalt(10)];
            case 2:
                salt = _b.sent();
                return [4 /*yield*/, bcrypt.hash(password, salt)
                    //เพิ่ม newUser เข้าใน db
                ];
            case 3:
                hashedPassword = _b.sent();
                return [4 /*yield*/, prisma.user.create({
                        data: {
                            email: email,
                            password: hashedPassword,
                            name: username,
                            avatar: photoBoy
                        }
                    })];
            case 4:
                newUser = _b.sent();
                return [2 /*return*/, res.status(200).json(newUser)];
            case 5:
                error_1 = _b.sent();
                res.status(500).json({ at: '/register', error: error_1 });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
router.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, passwordMatch, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, prisma.user.findUnique({
                        where: { email: email }
                    })];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ message: 'user not found go register' })];
                }
                return [4 /*yield*/, bcrypt.compare(password, user.password)];
            case 2:
                passwordMatch = _b.sent();
                if (!passwordMatch) {
                    return [2 /*return*/, res.status(400).json({ message: "password invalid" })];
                }
                return [4 /*yield*/, jwt.sign({ email: email }, process.env.JWT_SECRET_KEY, {
                        expiresIn: "5d"
                    })];
            case 3:
                token = _b.sent();
                res.cookie("token", token, {
                    maxAge: 15 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    secure: true,
                    // sameSite: "strict",
                    sameSite: "none",
                });
                res.status(200).json({ token: token, id: user.id });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                res.status(500).json({ at: "/login", error: error_2 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.post('/logout', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            // Clear the 'token' cookie
            //    await res.cookie("token", "", { maxAge: 0 });
            res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'none' });
            // Send a response indicating successful logout
            res.status(200).json({ message: 'Logout successful' });
        }
        catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error });
        }
        return [2 /*return*/];
    });
}); });
module.exports = router;
