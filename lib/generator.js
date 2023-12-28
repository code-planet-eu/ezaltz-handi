"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const playwright_extra_1 = require("playwright-extra");
const puppeteer_extra_plugin_stealth_1 = __importDefault(require("puppeteer-extra-plugin-stealth"));
const helper_1 = require("./helper");
const consola_1 = __importDefault(require("consola"));
const init = async () => {
    const accountInformation = await (0, helper_1.getAccountInformation)();
    playwright_extra_1.chromium.use((0, puppeteer_extra_plugin_stealth_1.default)());
    const browser = await playwright_extra_1.chromium.launch({
        headless: false,
        // args: ['--disable-web-security'],
        slowMo: 75,
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://store.steampowered.com/join/');
    page.on('response', async (response) => {
        if (response.url().includes('ajaxverifyemail')) {
            const responseBody = await response.json();
            const { success, details } = responseBody;
            consola_1.default.info(details);
            if (success !== 1) {
                browser.close();
                process.exit(1);
            }
        }
    });
    if (!accountInformation)
        throw new Error('Account information not found');
    const email = page.locator('#email');
    const reenterEmail = page.locator('#reenter_email');
    await page.waitForResponse((response) => response.url().includes('enterprise/bframe'), { timeout: 60000 });
    await email.pressSequentially(accountInformation.email, { delay: 10 });
    await reenterEmail.pressSequentially(accountInformation.email, { delay: 10 });
    const iframe = page.frames().find((frame) => frame.url().includes('enterprise/anchor'));
    if (!iframe)
        throw new Error('iframe not found');
    await iframe.click('#recaptcha-anchor');
    consola_1.default.box('Please solve the captcha');
    await iframe.waitForSelector('#recaptcha-anchor[aria-checked="true"]', { timeout: 100000 });
    consola_1.default.success('Captcha solved');
    await page.check('#i_agree_check');
    await page.click('#createAccountButton');
    await page.waitForTimeout(2000);
    if (await page.isVisible('#overAgeButton'))
        await page.click('#overAgeButton');
    const verifyUrl = await (0, helper_1.waitForVerifyUrl)(accountInformation.email);
    console.log(verifyUrl);
    await page.waitForURL(/completesignup/, { timeout: 600000 });
};
exports.init = init;
