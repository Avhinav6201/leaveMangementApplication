/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Logger/logger.ts":
/*!******************************!*\
  !*** ./src/Logger/logger.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.errorlogger = exports.infologger = void 0;\nconst winston_1 = __importDefault(__webpack_require__(/*! winston */ \"winston\"));\nconst infologger = winston_1.default.createLogger({\n    level: 'info',\n    format: winston_1.default.format.combine(winston_1.default.format.json() // Log messages as JSON\n    ),\n    transports: [\n        new winston_1.default.transports.File({ filename: './info.log', level: 'info' }),\n    ]\n});\nexports.infologger = infologger;\nconst errorlogger = winston_1.default.createLogger({\n    level: 'error',\n    format: winston_1.default.format.json(),\n    transports: [\n        new winston_1.default.transports.File({ filename: './error.log', level: 'error' })\n    ],\n});\nexports.errorlogger = errorlogger;\n// const dblogger= winston.createLogger({\n//   level: 'info',\n//   format: winston.format.json(),\n//   transports: [\n//     new winston.transports.File({ filename: 'error.log', level: 'error' }),\n//     new winston.transports.File({ filename: 'combined.log' }),\n//   ],\n// });\n\n\n//# sourceURL=webpack://backendts/./src/Logger/logger.ts?");

/***/ }),

/***/ "./src/Model/psqlAPM.ts":
/*!******************************!*\
  !*** ./src/Model/psqlAPM.ts ***!
  \******************************/
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst pg_1 = __webpack_require__(/*! pg */ \"pg\");\nconst logger_1 = __webpack_require__(/*! ../Logger/logger */ \"./src/Logger/logger.ts\");\nconst config = __webpack_require__(/*! ../config/constant */ \"./src/config/constant.ts\");\nconst pool = new pg_1.Pool(config.PgDbConfig);\n//const log = require('../log');\nmodule.exports.fnDbQuery = fnDbQuery;\nfunction fnDbQuery(methodName, queryText, queryParam) {\n    return __awaiter(this, void 0, void 0, function* () {\n        let client;\n        let start;\n        try {\n            start = Date.now();\n            client = yield pool.connect();\n            try {\n                const qResult = yield client.query(queryText, queryParam);\n                // eslint-disable-next-line prefer-const\n                const duration = Date.now() - start;\n                /*const result = {\n                  success: true,\n                  error: false,\n                  rows: qResult.rows // Extract only the rows from the query result\n                };*/\n                let result = qResult;\n                result[\"success\"] = true;\n                result.error = false;\n                console.log(\"info\", `${process.pid}, PSQL, ${methodName}, ${duration} ms, ${pool.idleCount} idle, ${pool.waitingCount} queue, ${pool.totalCount} total`);\n                logger_1.infologger.info('queryprocessed', {\n                    Date: new Date(),\n                    process_id: process.pid,\n                    duration: duration,\n                    idlecount: pool.idleCount,\n                    pooltotalcount: pool.totalCount,\n                    methodname: methodName\n                });\n                return result;\n            }\n            catch (e) {\n                console.log(\"error\", `${process.pid}, PSQLQueryError, ${methodName}, ${e.message}`);\n                return { success: false, qry_error: true, message: e.message };\n            }\n            finally {\n                client.release();\n            }\n        }\n        catch (e) {\n            console.log(\"error\", `${process.pid}, PSQL, ${methodName}, ${e.message}`);\n            console.log(\"PSQLConnectionErrorStack\", e.stack);\n            return { success: false, connection_error: true, message: e.message };\n        }\n    });\n}\npool.on('error', (err) => {\n    console.log(\"error\", `${process.pid}, PSQL Pool error, ${err.message}`);\n    console.error('Connection error experienced', err.message);\n});\n\n\n//# sourceURL=webpack://backendts/./src/Model/psqlAPM.ts?");

/***/ }),

/***/ "./src/Model/user.model.ts":
/*!*********************************!*\
  !*** ./src/Model/user.model.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst bcrypt_1 = __importDefault(__webpack_require__(/*! bcrypt */ \"bcrypt\"));\nconst psqlAPM = __webpack_require__(/*! ./psqlAPM */ \"./src/Model/psqlAPM.ts\");\nclass UserModel {\n    // Hash the user's password\n    hashPassword(password) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const salt = yield bcrypt_1.default.genSalt(10);\n            const hashedPassword = yield bcrypt_1.default.hash(password, salt);\n            return hashedPassword;\n        });\n    }\n    // Compare hashed password with the input password\n    comparePassword(password, hashedPassword) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return yield bcrypt_1.default.compare(password, hashedPassword);\n        });\n    }\n    // Create a new user in the database\n    createUser(name, email, password, designation, empId) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const hashedPassword = yield this.hashPassword(password);\n            const queryText = `\r\n      INSERT INTO \"Users\" (name, email, designation, empId, password, \"createdAt\", \"updatedAt\") \r\n      VALUES ($1, $2, $3, $4, $5, $6, $7)\r\n    `;\n            const queryParam = [name, email, designation, empId, hashedPassword, new Date(), new Date()];\n            return yield psqlAPM.fnDbQuery('createUser', queryText, queryParam);\n        });\n    }\n    // Find a user by email\n    findByemail(email) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const queryText = 'SELECT * FROM \"Users\" WHERE email = $1';\n            const queryParam = [email];\n            return yield psqlAPM.fnDbQuery('findByemail', queryText, queryParam);\n        });\n    }\n    // Update the user's password\n    updatePassword(email, password) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const hashedPassword = yield this.hashPassword(password);\n            const queryText = 'UPDATE \"Users\" SET password = $1 WHERE email = $2';\n            const queryParam = [hashedPassword, email];\n            return yield psqlAPM.fnDbQuery('updatePassword', queryText, queryParam);\n        });\n    }\n    // Register a leave request\n    // async registerForLeave(user_id: number, Startdate: Date, endDate: Date, leave_type: number, noOfDays: number) {\n    //   const queryText = `\n    //     INSERT INTO leave_request (user_id, start_date, end_date, leave_type_id, no_of_days) \n    //     VALUES ($1, $2, $3, $4, $5)\n    //   `;\n    //   const queryParam = [user_id, Startdate, endDate, leave_type, noOfDays];\n    //   return await psqlAPM.fnDbQuery('registerForLeave', queryText, queryParam);\n    // }\n    // Check user's leave balance\n    checkforleave(user_id, leave_type_id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const queryText = 'SELECT * FROM user_leave_details WHERE user_id = $1 AND leave_type_id = $2';\n            const queryParam = [user_id, leave_type_id];\n            return yield psqlAPM.fnDbQuery('checkforleave', queryText, queryParam);\n        });\n    }\n    // Update user's leave balance\n    updateUserLeave(user_id, leave_type_id, no_of_days, newAvailable) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const queryText = `\r\n      UPDATE user_leave_details \r\n      SET available = $1, used = $2, modified_by = $3, modified_on = $4 \r\n      WHERE leave_type_id = $5 AND user_id = $6\r\n    `;\n            const queryParam = [newAvailable, no_of_days, user_id, new Date(), leave_type_id, user_id];\n            return yield psqlAPM.fnDbQuery('updateUserLeave', queryText, queryParam);\n        });\n    }\n    getUserleaveDetails(id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const queryText = `Select * from user_leave_details where user_id=$1`;\n            const queryParam = [id];\n            return yield psqlAPM.fnDbQuery('getUserleaveDetails', queryText, queryParam);\n        });\n    }\n    // Submit a leave request\n    userleaveRequest(user_id, startdate, endDate, leave_type_id, no_of_days, reason) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const queryText = `\r\n      INSERT INTO leave_request (user_id, start_date, end_date,leave_type_id,no_of_days,reason,created_on,created_by) \r\n      VALUES ($1, $2, $3, $4, $5,$6,$7,$8)`;\n            const queryParam = [user_id, startdate, endDate, leave_type_id, no_of_days, reason, new Date(), user_id];\n            return yield psqlAPM.fnDbQuery('userleaveRequest', queryText, queryParam);\n        });\n    }\n    // Get all leave types\n    getLeaveType() {\n        return __awaiter(this, void 0, void 0, function* () {\n            const queryText = 'SELECT * FROM leave_type';\n            return yield psqlAPM.fnDbQuery('getLeaveType', queryText);\n        });\n    }\n    getUserLeave(id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const queryText = `SELECT lt.leave_type,uld.* FROM leave_type As lt INNER JOIN user_leave_details As uld ON lt.id = uld.leave_type_id WHERE \r\n    uld.user_id=$1`;\n            const queryParam = [id];\n            return yield psqlAPM.fnDbQuery('getUserLeave', queryText, queryParam);\n        });\n    }\n}\nexports[\"default\"] = new UserModel();\n\n\n//# sourceURL=webpack://backendts/./src/Model/user.model.ts?");

/***/ }),

/***/ "./src/api/api.ts":
/*!************************!*\
  !*** ./src/api/api.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst user_controller_1 = __importDefault(__webpack_require__(/*! ../controller/user.controller */ \"./src/controller/user.controller.ts\"));\nconst auth_controller_1 = __webpack_require__(/*! ../controller/auth.controller */ \"./src/controller/auth.controller.ts\");\nconst router = express_1.default.Router();\nconsole.log('registering the routes');\nrouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        let result = yield user_controller_1.default.logIn(req, res);\n        res.json(result);\n    }\n    catch (e) {\n        res.json({ success: false, error: true, message: e.message });\n    }\n}));\nrouter.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        let result = yield user_controller_1.default.register(req, res);\n        res.json(result);\n    }\n    catch (e) {\n        res.json({ success: false, error: true, message: e.message });\n    }\n}));\nrouter.post('/sendEmail', (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        let result = yield user_controller_1.default.ForgetPassword(req, res);\n        // console.log('result:', res.json(result))\n        res.json(result);\n    }\n    catch (e) {\n        res.json({ success: false, error: true, message: e.message });\n    }\n}));\nrouter.post('/resetPassword', (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        let result = yield user_controller_1.default.resetPassword(req, res);\n        res.json(result);\n    }\n    catch (e) {\n        res.json({ success: false, error: true, message: e.message });\n    }\n}));\nrouter.get('/genrateOtp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        let result = yield user_controller_1.default.generateOtp(req, res);\n        res.json(result);\n    }\n    catch (e) {\n        res.json({ success: false, error: true, message: e.message });\n    }\n}));\nrouter.get('/verifyOtp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        let result = yield user_controller_1.default.verifyOtp(req, res);\n        res.json(result);\n    }\n    catch (e) {\n        res.json({ success: false, error: true, message: e.message });\n    }\n}));\nrouter.use(auth_controller_1.isAutheticated);\nrouter.post('/registerForLeave', (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        let result = yield user_controller_1.default.registerForLeave(req, res);\n        res.json(result);\n    }\n    catch (e) {\n        res.json({ success: false, error: true, message: e.message });\n    }\n}));\nrouter.get('/getLeavedetails', (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        let result = yield user_controller_1.default.getUserLeave(req, res);\n        res.json(result);\n    }\n    catch (e) {\n        res.json({ success: false, error: true, message: e.message });\n    }\n}));\nrouter.get('/getUserLeavedetails', (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        let result = yield user_controller_1.default.getUserLeaveDetails(req, res);\n        res.json(result);\n    }\n    catch (e) {\n        res.json({ success: false, error: true, message: e.message });\n    }\n}));\nrouter.get('/getUserLeave', (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        let result = yield user_controller_1.default.getUserLeaveName(req, res);\n        res.json(result);\n    }\n    catch (e) {\n        res.json({ success: false, error: true, message: e.message });\n    }\n}));\nconsole.log('Routes Registered');\nexports[\"default\"] = router;\n\n\n//# sourceURL=webpack://backendts/./src/api/api.ts?");

/***/ }),

/***/ "./src/config/constant.ts":
/*!********************************!*\
  !*** ./src/config/constant.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.transport = exports.PgDbConfig = exports.jwtSecret = void 0;\nexports.generateToken = generateToken;\nexports.generateTokenForForgetPassWord = generateTokenForForgetPassWord;\nconst jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\"));\nexports.jwtSecret = 'Abhinav@123';\nconst nodemailer = __webpack_require__(/*! nodemailer */ \"nodemailer\");\nexports.PgDbConfig = {\n    user: 'postgres',\n    host: '127.0.0.1',\n    database: 'persondb',\n    password: 'root',\n    port: 5432\n};\nfunction generateToken(user) {\n    return jsonwebtoken_1.default.sign({ id: user.id, username: user.username, email: user.email }, exports.jwtSecret, { expiresIn: '1h' });\n}\n;\nfunction generateTokenForForgetPassWord(u_email) {\n    return jsonwebtoken_1.default.sign({\n        email: u_email\n    }, exports.jwtSecret, { expiresIn: '3h' });\n}\nconst transport = nodemailer.createTransport({\n    host: 'smtp.gmail.com',\n    service: \"gmail\",\n    secure: false,\n    port: 465,\n    auth: {\n        user: process.env.s_email,\n        pass: process.env.s_password\n    }\n});\nexports.transport = transport;\n\n\n//# sourceURL=webpack://backendts/./src/config/constant.ts?");

/***/ }),

/***/ "./src/controller/auth.controller.ts":
/*!*******************************************!*\
  !*** ./src/controller/auth.controller.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.isAutheticated = void 0;\nconst jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\"));\nconst constant_1 = __webpack_require__(/*! ../config/constant */ \"./src/config/constant.ts\");\nconst Key = constant_1.jwtSecret;\nconst isAutheticated = (req, res, next) => {\n    const Authheader = req.get('authToken');\n    if (!Authheader) {\n        console.log(\"no token\");\n        return { Success: false, message: '404 not found' };\n    }\n    let token = Authheader.split(' ')[1];\n    let decodeddata;\n    try {\n        decodeddata = jsonwebtoken_1.default.verify(token, Key);\n        // return{\n        //     success:true,message:'User Validated'\n        //  }\n        req.user = decodeddata;\n        next();\n    }\n    catch (err) {\n        console.log(\"wrong credential\" + err);\n        return {\n            success: false, message: 'User not  Validated'\n        };\n    }\n};\nexports.isAutheticated = isAutheticated;\n\n\n//# sourceURL=webpack://backendts/./src/controller/auth.controller.ts?");

/***/ }),

/***/ "./src/controller/user.controller.ts":
/*!*******************************************!*\
  !*** ./src/controller/user.controller.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst user_model_1 = __importDefault(__webpack_require__(/*! ../Model/user.model */ \"./src/Model/user.model.ts\"));\nconst constant_1 = __webpack_require__(/*! ../config/constant */ \"./src/config/constant.ts\");\nconst user_model_2 = __importDefault(__webpack_require__(/*! ../Model/user.model */ \"./src/Model/user.model.ts\"));\nconst constant_2 = __webpack_require__(/*! ../config/constant */ \"./src/config/constant.ts\");\nconst inspector_1 = __webpack_require__(/*! inspector */ \"inspector\");\nclass UserController {\n    constructor() {\n        this.generateOtp = (req, res) => {\n            const email = req.query.email;\n            this.u_email = email;\n            inspector_1.console.log(`Received email: ${email}`);\n            const num = Math.floor(Math.random() * 900000) + 100000;\n            this.Otp = num.toString(); // Store OTP in the class instance\n            inspector_1.console.log(`Generated OTP: ${this.Otp}`);\n            return { message: 'OTP generated successfully. Please check your email.' };\n        };\n        this.verifyOtp = (req, res) => {\n            const enteredOtp = req.query.otp; // Extract OTP from query parameters\n            inspector_1.console.log(`Entered OTP: ${enteredOtp}`);\n            inspector_1.console.log(`Stored OTP: ${this.Otp}`);\n            if (!enteredOtp) {\n                return { success: false, error: 'OTP is required for verification.' };\n            }\n            // Compare the entered OTP with the stored OTP\n            if (enteredOtp === this.Otp) {\n                inspector_1.console.log('OTP verification successful');\n                return { success: true, message: 'OTP verified successfully.' };\n            }\n            else {\n                inspector_1.console.log('Invalid OTP');\n                //   return { success: false, error: 'Invalid OTP. Please try again.' };\n            }\n        };\n    }\n    register(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const { name, email, password, empId, designation } = req.body;\n            try {\n                // Check if the user already exists\n                const userExists = yield user_model_1.default.findByemail(email);\n                if (userExists.rows.length > 0) {\n                    return { success: false, message: 'User already exists.' };\n                }\n                // Create a new user\n                const result = yield user_model_1.default.createUser(name, email, password, designation, empId);\n                if (result.success) {\n                    return { success: true, message: 'User registered successfully.' };\n                }\n                else {\n                    return { success: false, message: 'Error registering user.' };\n                }\n            }\n            catch (error) {\n                inspector_1.console.error('Error in user registration:', error);\n                return { success: false, message: 'Internal server error.' };\n            }\n        });\n    }\n    logIn(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const { email, password } = req.body;\n            try {\n                this.u_email = email;\n                // console.log(email)\n                // Find the user by email\n                const user = yield user_model_1.default.findByemail(email);\n                if (user.rows.length === 0) {\n                    return { success: false, message: 'Invalid email or password.' };\n                }\n                // Check if the password is correct\n                const userData = user.rows[0];\n                const hashedPassword = yield user_model_1.default.hashPassword(password); // Corrected hashing logic\n                if (yield user_model_1.default.comparePassword(password, hashedPassword)) {\n                    const token = (0, constant_1.generateToken)(userData);\n                    return { success: true, message: 'Login Successful', token, userData };\n                }\n                else {\n                    return { success: false, message: 'Invalid email or password.' };\n                }\n            }\n            catch (error) {\n                inspector_1.console.log(error);\n                return { success: false, message: 'Error in login.' };\n            }\n        });\n    }\n    ForgetPassword(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const { email } = req.body;\n            inspector_1.console.log('email', email);\n            try {\n                const user = yield user_model_2.default.findByemail(email);\n                inspector_1.console.log('user', user);\n                if (user.rows.length > 0) {\n                    const token = (0, constant_1.generateTokenForForgetPassWord)(email);\n                    const link = `http://localhost:4200/reset-password/${token}`;\n                    const mailOptions = {\n                        from: process.env.s_email, // Sender address\n                        to: email, // List of recipients\n                        subject: 'Leave Mangement Password Reset',\n                        text: 'be happy', // Plain text body\n                        html: `<b>Leave Mangement Password Reset!!</b>\r\n        <p>We heard that you lost your Leave Mangement Application password. Sorry about that!But don’t worry!<br> \r\n        You can use the following link to reset your password:</p><br>\r\n        <p>${link}</p> \r\n        `\n                    };\n                    const info = yield constant_2.transport.sendMail(mailOptions); // Await sending of email\n                    inspector_1.console.log('Email sent: ' + info.response);\n                    inspector_1.console.log('token', token);\n                    return { success: true, message: 'Email sent successfully', link: link };\n                }\n                else {\n                    return {\n                        success: false, message: 'user does not exist'\n                    };\n                }\n            }\n            catch (error) {\n                inspector_1.console.error('Error while sending email:', error);\n                return ({ error: 'Failed to send email' }); // Send error response to client\n            }\n        });\n    }\n    ;\n    resetPassword(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const { password } = req.body;\n            inspector_1.console.log(password);\n            try {\n                const hashedPassword = yield user_model_1.default.hashPassword(password);\n                // Update the user's password in the database\n                const result = yield user_model_1.default.updatePassword(req.user.email, hashedPassword);\n                if (result.success) {\n                    inspector_1.console.log('Password updated successfully');\n                    return { success: true, message: 'Password reset successfully.' };\n                }\n                else {\n                    return { success: false, message: 'Error resetting password.' };\n                }\n            }\n            catch (error) {\n                inspector_1.console.error('Error in resetting password:', error);\n                return { success: false, message: 'Internal server error.' };\n            }\n        });\n    }\n    registerForLeave(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const { noOfDays, leaveType, reason, startDate, endDate } = req.body;\n            try {\n                const result = yield user_model_1.default.checkforleave(req.user.id, leaveType);\n                const leave = result.rows[0];\n                if (result.success) {\n                    if (leave == null || undefined) {\n                        inspector_1.console.log('insufficient Leave');\n                        return {\n                            success: false, message: 'insufficient leave'\n                        };\n                    }\n                    else if (leave.available >= noOfDays) {\n                        const newAvailable = Number(leave.available) - Number(noOfDays);\n                        const UpdatedUsed = Number(leave.used) + Number(noOfDays);\n                        const Updatedresult = yield user_model_1.default.updateUserLeave(req.user.id, leaveType, UpdatedUsed, newAvailable);\n                        if (Updatedresult.success) {\n                            const result = yield user_model_1.default.userleaveRequest(req.user.id, startDate, endDate, leaveType, noOfDays, reason);\n                            inspector_1.console.log('Updated Sucessfully');\n                            return { success: true, message: 'Applied for leave Sucessfully' };\n                        }\n                        else {\n                            return { success: false, message: 'you are not eligible to take leave' };\n                        }\n                    }\n                    else {\n                        return {\n                            sucess: true, message: 'Currently you are not having available Leave'\n                        };\n                    }\n                }\n            }\n            catch (error) {\n                inspector_1.console.log(error);\n            }\n        });\n    }\n    getUserLeave(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                let result = yield user_model_1.default.getLeaveType();\n                if (result.success) {\n                    return { success: true, message: 'Leave type Fetched Successfully', result };\n                }\n                else {\n                    return { success: false, message: 'not able to fetch leaveType' };\n                }\n            }\n            catch (err) {\n                inspector_1.console.log(err);\n            }\n        });\n    }\n    getUserLeaveDetails(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                const userId = Number(req.user.id);\n                // console.log(req.user.id)\n                const result = yield user_model_1.default.getUserleaveDetails(userId);\n                if (result.success) {\n                    // console.log(result)\n                    return {\n                        success: true, message: 'user leave details fetched', result\n                    };\n                }\n                else {\n                    return {\n                        success: false,\n                        message: 'user leave details not fetched'\n                    };\n                }\n            }\n            catch (error) {\n            }\n        });\n    }\n    getUserLeaveName(req, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                let result = yield user_model_1.default.getUserLeave(req.user.id);\n                if (result.success) {\n                    inspector_1.console.log(result.rows);\n                    return {\n                        success: true,\n                        message: 'user leave type id fetched Sucessfully',\n                        result\n                    };\n                }\n                else {\n                    return {\n                        success: false,\n                        message: 'not able to fetch leave id  '\n                    };\n                }\n            }\n            catch (error) {\n                inspector_1.console.log(error);\n            }\n        });\n    }\n}\nexports[\"default\"] = new UserController();\n\n\n//# sourceURL=webpack://backendts/./src/controller/user.controller.ts?");

/***/ }),

/***/ "./src/indexssl.ts":
/*!*************************!*\
  !*** ./src/indexssl.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst https_1 = __importDefault(__webpack_require__(/*! https */ \"https\"));\nconst fs = __webpack_require__(/*! fs */ \"fs\");\nconst cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\nconst constant_1 = __webpack_require__(/*! ./config/constant */ \"./src/config/constant.ts\");\nconst api_1 = __importDefault(__webpack_require__(/*! ./api/api */ \"./src/api/api.ts\"));\nconst pg_1 = __webpack_require__(/*! pg */ \"pg\");\nconst app = (0, express_1.default)();\nconst pool = new pg_1.Pool(constant_1.PgDbConfig);\napp.use((0, cors_1.default)());\napp.use('/api', api_1.default);\napp.use(express_1.default.json());\nconsole.log('API routed');\n;\nconst key = fs.readFileSync(process.env.ssl_key, 'utf8');\nconst cert = fs.readFileSync(process.env.ssl_cert, 'utf8');\nconst ca = fs.readFileSync(process.env.ssl_ca, 'utf8');\nconst options = {\n    key: key,\n    cert: cert,\n    ca: ca,\n};\nconst httpsport = 3000;\nhttps_1.default.createServer(options, app).listen(httpsport, () => console.log(' Server listening on port ' + httpsport + '!'));\n\n\n//# sourceURL=webpack://backendts/./src/indexssl.ts?");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("nodemailer");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("pg");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("winston");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "inspector":
/*!****************************!*\
  !*** external "inspector" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("inspector");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/indexssl.ts");
/******/ 	
/******/ })()
;