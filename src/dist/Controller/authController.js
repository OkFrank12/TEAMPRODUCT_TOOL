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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneUser = exports.updateOneUser = exports.readOneUser = exports.readUser = exports.signInUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const authModel_1 = __importDefault(require("../Model/authModel"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password, email, avatar } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        const user = yield authModel_1.default.create({
            userName,
            email,
            password: hash,
            avatar,
        });
        return res.status(201).json({
            message: "Created user succesfully",
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating user",
        });
    }
});
exports.createUser = createUser;
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const getUser = yield authModel_1.default.findOne({ email });
        const hash = yield bcrypt_1.default.compare(password, getUser === null || getUser === void 0 ? void 0 : getUser.password);
        if (getUser) {
            if (hash) {
                return res.status(201).json({
                    message: `Welcome back ${getUser === null || getUser === void 0 ? void 0 : getUser.userName}`,
                    data: getUser === null || getUser === void 0 ? void 0 : getUser._id,
                });
            }
            else {
                return res.status(404).json({
                    message: "Password is incorrect",
                });
            }
        }
        else {
            return res.status(404).json({
                message: "User Not Found",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error sign-in",
        });
    }
});
exports.signInUser = signInUser;
const readUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield authModel_1.default.find();
        return res.status(200).json({
            message: "Reading users successfully",
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error reading user",
        });
    }
});
exports.readUser = readUser;
const readOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield authModel_1.default.findById(id);
        return res.status(200).json({
            message: "Reading one-user",
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error reading one-user",
        });
    }
});
exports.readOneUser = readOneUser;
const updateOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { userName, avatar } = req.body;
        const user = yield authModel_1.default.findByIdAndUpdate(id, {
            userName,
            avatar,
        }, { new: true });
        return res.status(201).json({
            message: "Updating users",
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error updating user",
        });
    }
});
exports.updateOneUser = updateOneUser;
const deleteOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield authModel_1.default.findByIdAndDelete(id);
        return res.status(201).json({
            message: "Deleted user",
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error deleting user",
        });
    }
});
exports.deleteOneUser = deleteOneUser;
