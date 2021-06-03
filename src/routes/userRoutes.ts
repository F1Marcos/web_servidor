import { Router, Request, Response } from 'express';
import userController from '../controller/userController';
import {registerSchema} from '../schema/register-schema';
import {validationSingUp} from '../middleware/validationSignUp';
import {signinSchema} from '../schema/signin-schema';
import {validationSingIn} from '../middleware/validationSingIn';
import {TokenValidation} from "../lib/verifyToken";

 
class UserRoutes{
	public router: Router = Router();
	constructor(){
		this.config();
	}
	config():void{
		this.router.get('/',(req:Request,res:Response)=> {
            res.send('Main!!!');
            //res.render("partials/principal");
        });
        /*
        this.router.get('/signin',(req:Request,res:Response)=> {
            res.send('Sign In!!!');
            //res.render("partials/principal");
        });
        */
        this.router.get('/list',TokenValidation,userController.list);

        // LOGIN:
        this.router.get('/signin',userController.signin);
        // this.router.post('/signin',userController.login);
        this.router.post('/signin', signinSchema, validationSingIn, userController.login);

        // REGISTRO:
        this.router.get('/signup',userController.signup);
        // this.router.post('/signup',userController.addUser);
        this.router.post('/signup',registerSchema, validationSingUp, userController.addUser);
        //Home del usuario:
		/*
        this.router.get('/home',(req:Request,res:Response)=> {
        res.send('Bienvenido!!!')});
        */
        this.router.get('/home',userController.home);

        //CRUD
		this.router.get('/list',userController.list);
		this.router.get('/find/:id',userController.find);
        this.router.get('/findOne/:id',userController.findOne);
		this.router.post('/add',userController.addUser);
		//this.router.put('/update/:id',userController.update);
        this.router.post('/signMod',userController.signMod);
		this.router.delete('/delete/:id',userController.delete);
        this.router.get('/delete/:id',userController.delete);

        this.router.get('/controls',userController.control);
        // FIN CRUD

        this.router.get('/control',userController.control);
        this.router.post('/procesar',userController.procesar);
        // Para terminar la Session:
        this.router.get('/salir',userController.endSession);
        this.router.get('/error',userController.showError);
    }
}

//Exportamos el enrutador con 

const userRoutes = new UserRoutes();
export default userRoutes.router;