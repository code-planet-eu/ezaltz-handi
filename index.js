"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const readline = __importStar(require("readline"));
const consola_1 = __importDefault(require("consola"));
const generator_1 = require("./lib/generator");
function getDiscordId() {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync('./discord')) {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });
            rl.question('Enter your discord id: ', (discord) => {
                if (discord) {
                    fs.writeFileSync('./discord', discord);
                    resolve(discord);
                }
                else {
                    reject('No discord id provided');
                }
                rl.close();
            });
        }
        else {
            const discord = fs.readFileSync('./discord', 'utf8');
            resolve(discord);
        }
    });
}
getDiscordId()
    .then((_) => {
    consola_1.default.info('Starting app...');
    (0, generator_1.init)();
})
    .catch((error) => {
    consola_1.default.error(error);
});
