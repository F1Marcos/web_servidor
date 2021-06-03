"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controller/userController"));
const register_schema_1 = require("../schema/register-schema");
const validationSignUp_1 = require("../middleware/validationSignUp");
const signin_schema_1 = require("../schema/signin-schema");
const validationSingIn_1 = require("../middleware/validationSingIn");
const verifyToken_1 = require("../lib/verifyToken");
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            res.send('Main!!!');
            //res.render("partials/principal");
        });
        /*
        this.router.get('/signin',(req:Request,res:Response)=> {
            res.send('Sign In!!!');
            //res.render("partials/principal");
        });
        */
        this.router.get('/list', verifyToken_1.TokenValidation, userController_1.default.list);
        // LOGIN:
        this.router.get('/signin', userController_1.default.signin);
        // this.router.post('/signin',userController.login);
        this.router.post('/signin', signin_schema_1.signinSchema, validationSingIn_1.validationSingIn, userController_1.default.login);
        // REGISTRO:
        this.router.get('/signup', userController_1.default.signup);
        // this.router.post('/signup',userController.addUser);
        this.router.post('/signup', register_schema_1.registerSchema, validationSignUp_1.validationSingUp, userController_1.default.addUser);
        //Home del usuario:
        /*
        this.router.get('/home',(req:Request,res:Response)=> {
        res.send('Bienvenido!!!')});
        */
        this.router.get('/home', userController_1.default.home);
        //CRUD
        this.router.get('/list', userController_1.default.list);
        this.router.get('/find/:id', userController_1.default.find);
        this.router.get('/findOne/:id', userController_1.default.findOne);
        this.router.post('/add', userController_1.default.addUser);
        //this.router.put('/update/:id',userController.update);
        this.router.post('/signMod', userController_1.default.signMod);
        this.router.delete('/delete/:id', userController_1.default.delete);
        this.router.get('/delete/:id', userController_1.default.delete);
        this.router.get('/controls', userController_1.default.control);
        // FIN CRUD
        this.router.get('/control', userController_1.default.control);
        this.router.post('/procesar', userController_1.default.procesar);
        // Para terminar la Session:
        this.router.get('/salir', userController_1.default.endSession);
        this.router.get('/error', userController_1.default.showError);
    }
}
//Exportamos el enrutador con 
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
//# sourceMappingURL=userRoutes.js.map