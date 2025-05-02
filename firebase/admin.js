"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.auth = void 0;
var app_1 = require("firebase-admin/app");
var auth_1 = require("firebase-admin/auth");
var firestore_1 = require("firebase-admin/firestore");
function initFirebaseAdmin() {
    var _a;
    var apps = (0, app_1.getApps)();
    if (!apps.length) {
        // Initialize with proper error checking for environment variables
        var projectId = process.env.FIREBASE_PROJECT_ID;
        var clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
        var privateKey = (_a = process.env.FIREBASE_PRIVATE_KEY) === null || _a === void 0 ? void 0 : _a.replace(/\\n/g, "\n");
        if (!projectId || !clientEmail || !privateKey) {
            throw new Error("Missing Firebase admin credentials");
        }
        (0, app_1.initializeApp)({
            credential: (0, app_1.cert)({
                projectId: projectId,
                clientEmail: clientEmail,
                privateKey: privateKey,
            }),
        });
    }
    var db = (0, firestore_1.getFirestore)();
    // Enable ignoreUndefinedProperties
    db.settings({ ignoreUndefinedProperties: true });
    return {
        auth: (0, auth_1.getAuth)(),
        db: db,
    };
}
exports.auth = (_a = initFirebaseAdmin(), _a.auth), exports.db = _a.db;
