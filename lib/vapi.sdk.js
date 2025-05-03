"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vapi = void 0;
var web_1 = require("@vapi-ai/web");
exports.vapi = new web_1.default(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN);
if (!process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN) {
    console.error("VAPI token is missing!");
}
