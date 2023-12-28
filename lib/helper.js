"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForVerifyUrl = exports.getAccountInformation = void 0;
const request_promise_native_1 = __importDefault(require("request-promise-native"));
const getAccountInformation = async () => {
    try {
        const url = 'https://beta.ezaltz.com/api/account';
        const response = await (0, request_promise_native_1.default)({
            url,
            method: 'GET',
            json: true,
            headers: {
                'discord-id': '616613956676485122',
            },
        });
        return response;
    }
    catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};
exports.getAccountInformation = getAccountInformation;
const waitForVerifyUrl = async (email) => {
    try {
        const url = 'https://beta.ezaltz.com/api/mail';
        const response = await (0, request_promise_native_1.default)({
            url,
            method: 'GET',
            json: true,
            headers: {
                'discord-id': '616613956676485122',
            },
            qs: {
                mail: email,
            },
        });
        if (!response)
            throw new Error('Email not found');
        return response;
    }
    catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};
exports.waitForVerifyUrl = waitForVerifyUrl;
