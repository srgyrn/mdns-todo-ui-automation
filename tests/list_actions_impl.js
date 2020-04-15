/* globals gauge*/
"use strict";
const { openBrowser, write, closeBrowser, text, focus, intercept, goto} = require('taiko');
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';
const projectUrl = process.env.APP_URL;
const apiUrl = process.env.API_URL;

beforeSuite(async () => {
    await openBrowser({ headless: headless })
});

afterSuite(async () => {
    await closeBrowser();
});

step("Goto homepage", async () => {
    await goto(projectUrl)
    await intercept(apiUrl, (request) => {request.response({body:'{[]}'})});
});

step("Write <content>", async (content) => {
    await focus($('#list-input'));
    await write(content);
});

step("Click <button_name>", async (button_name) => {
     await click(button_name);
});

step("Page contains <content>", async (content) => {
    assert.ok(await text(content).exists);
});

step("Error text says <error_text>", async (error_text) => {
    assert.ok(await $("#error-div").isVisible());
    assert.equal(await text(error_text).exists);
});