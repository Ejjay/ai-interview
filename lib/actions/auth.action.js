"use server";
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
exports.isAuthenticated = exports.getCurrentUser = exports.signOut = exports.signIn = exports.signUp = exports.setSessionCookie = void 0;
var admin_1 = require("@/firebase/admin");
var headers_1 = require("next/headers");
// Session duration (1 week)
var SESSION_DURATION = 60 * 60 * 24 * 7;
// Set session cookie
function setSessionCookie(idToken) {
    return __awaiter(this, void 0, void 0, function () {
        var cookieStore, sessionCookie;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, headers_1.cookies)()];
                case 1:
                    cookieStore = _a.sent();
                    return [4 /*yield*/, admin_1.auth.createSessionCookie(idToken, {
                            expiresIn: SESSION_DURATION * 1000, // milliseconds
                        })];
                case 2:
                    sessionCookie = _a.sent();
                    // Set cookie in the browser
                    cookieStore.set("session", sessionCookie, {
                        maxAge: SESSION_DURATION,
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        path: "/",
                        sameSite: "lax",
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.setSessionCookie = setSessionCookie;
function signUp(params) {
    return __awaiter(this, void 0, void 0, function () {
        var uid, name, email, userRecord, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    uid = params.uid, name = params.name, email = params.email;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, admin_1.db.collection("users").doc(uid).get()];
                case 2:
                    userRecord = _a.sent();
                    if (userRecord.exists)
                        return [2 /*return*/, {
                                success: false,
                                message: "User already exists. Please sign in.",
                            }];
                    // save user to db
                    return [4 /*yield*/, admin_1.db.collection("users").doc(uid).set({
                            name: name,
                            email: email,
                            // profileURL,
                            // resumeURL,
                        })];
                case 3:
                    // save user to db
                    _a.sent();
                    return [2 /*return*/, {
                            success: true,
                            message: "Account created successfully. Please sign in.",
                        }];
                case 4:
                    error_1 = _a.sent();
                    console.error("Error creating user:", error_1);
                    // Handle Firebase specific errors
                    if (error_1.code === "auth/email-already-exists") {
                        return [2 /*return*/, {
                                success: false,
                                message: "This email is already in use",
                            }];
                    }
                    return [2 /*return*/, {
                            success: false,
                            message: "Failed to create account. Please try again.",
                        }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.signUp = signUp;
function signIn(params) {
    return __awaiter(this, void 0, void 0, function () {
        var email, idToken, userRecord, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = params.email, idToken = params.idToken;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, admin_1.auth.getUserByEmail(email)];
                case 2:
                    userRecord = _a.sent();
                    if (!userRecord)
                        return [2 /*return*/, {
                                success: false,
                                message: "User does not exist. Create an account.",
                            }];
                    return [4 /*yield*/, setSessionCookie(idToken)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.log("");
                    return [2 /*return*/, {
                            success: false,
                            message: "Failed to log into account. Please try again.",
                        }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.signIn = signIn;
// Sign out user by clearing the session cookie
function signOut() {
    return __awaiter(this, void 0, void 0, function () {
        var cookieStore;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, headers_1.cookies)()];
                case 1:
                    cookieStore = _a.sent();
                    cookieStore.delete("session");
                    return [2 /*return*/];
            }
        });
    });
}
exports.signOut = signOut;
// Get current user from session cookie
function getCurrentUser() {
    return __awaiter(this, void 0, Promise, function () {
        var cookieStore, session, sessionCookie, decodedClaims, userRecord, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, (0, headers_1.cookies)()];
                case 1:
                    cookieStore = _a.sent();
                    session = cookieStore.get("session");
                    if (!session) {
                        return [2 /*return*/, null];
                    }
                    sessionCookie = session.value;
                    return [4 /*yield*/, admin_1.auth.verifySessionCookie(sessionCookie, true)];
                case 2:
                    decodedClaims = _a.sent();
                    return [4 /*yield*/, admin_1.db.collection("users").doc(decodedClaims.uid).get()];
                case 3:
                    userRecord = _a.sent();
                    if (!userRecord.exists)
                        return [2 /*return*/, null];
                    return [2 /*return*/, __assign(__assign({}, userRecord.data()), { id: userRecord.id })];
                case 4:
                    error_3 = _a.sent();
                    console.error("Error getting current user:", error_3);
                    return [2 /*return*/, null];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getCurrentUser = getCurrentUser;
// Check if user is authenticated
function isAuthenticated() {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getCurrentUser()];
                case 1:
                    user = _a.sent();
                    return [2 /*return*/, !!user];
            }
        });
    });
}
exports.isAuthenticated = isAuthenticated;
