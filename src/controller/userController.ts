import { Request, Response } from 'express';
// import {connect} from '../models/userModels';
import userModel from '../models/userModels';
import { body, validationResult } from 'express-validator';
import flash from "connect-flash";
import { setOriginalNode } from 'typescript';
import jwt from "jsonwebtoken";

const listado = [
    { "id": "1", "usuario": "Juan Perez", "password": "123456" },
    { "id": "2", "usuario": "Pepe Cadena", "password": "123456" },
    { "id": "3", "usuario": "Martin Gonzalez", "password": "123456" }
];

class UserController {

    public signin(req: Request, res: Response) {
        console.log(req.body);
        //res.send('Sign In!!!');
        res.render("partials/signinForm");
    }

    public async login(req: Request, res: Response) {
        const { usuario, password } = req.body;
        const result = await userModel.buscarNombre(usuario);
        console.log(usuario);
        console.log(password);
        console.log(result);
        //if (!result) {
        if (!result || usuario !=result.nombre || password!=result.password) {

            // res.send({ "Usuario no registrado Recibido": req.body });
            return  res.status(403).json({ message:"Usuario y/o contraseña incorrectos"});
        }
        if (result.nombre == usuario && result.password == password) {
            const token:string=jwt.sign({_id: usuario.id},"secretKey");
            return res.status(200).json({ message:"Bienvenido "+result.nombre,token:token, usuario:result.nombre, rol:result.rol});
        }
        return res.status(404).json({ message:"Usuario no registrado"});
    }

    //registro
    public signup(req: Request, res: Response) {
        console.log(req.body);
        //res.send('Sign Up!!!');
        res.render("partials/signupForm");
    }

    public home(req: Request, res: Response) {
        console.log(req.body);
        if (!req.session.auth) {
            // res.redirect("/");
            req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
            res.redirect("./error");
        }
        //res.send('Bienvenido!!!');
        //res.render("partials/home");
        res.render("partials/home", { mi_session: true });
    }

    //CRUD
    public async list(req: Request, res: Response) {
        console.log(req.body);
        const usuarios = await userModel.listar();
        console.log(usuarios);
        return res.json(usuarios);
        //res.send('Listado de usuarios!!!');
    }

    //FIND:
    public async find(req: Request, res: Response) {
        console.log(req.params.id);
        const { id } = req.params;
        const usuario = await userModel.buscarId(id);
        if (usuario)
            return res.json(usuario);
        res.status(404).json({ text: "User doesn't exists" });
    }

    public async findOne(req: Request, res: Response) {
        console.log(req.params.id);
        const { id } = req.params;
        const usuario = await userModel.buscarId(id);
        if (usuario) {
            // return res.json(usuario);
            const user = usuario;
            console.log(usuario);
            console.log(usuario.id);
            console.log(usuario.nombre);
            res.render("partials/seleccionMod", { user: usuario, userLoginOk: req.session.user, mi_session: true });
        }
        else
            res.status(404).json({ text: "User doesn't exists" });
    }

    public async addUser(req: Request, res: Response) {
        const usuario = req.body;
        delete usuario.repassword;
        console.log(req.body);
        //res.send('Usuario agregado!!!');
        const busqueda = await userModel.buscarNombre(usuario.nombre);
        if (!busqueda) {
            const result = await userModel.crear(usuario);
            return res.status(200).json({ message: 'User saved!!' });
        }
        return res.status(403).json({ message: 'User exists!!' });

    }

    public async update(req: Request, res: Response) {
        console.log(req.body);
        const { id } = req.params;
        const result = await userModel.actualizar(req.body, id);
        //res.send('Usuario '+ req.params.id +' actualizado!!!');
        return res.json({ text: 'updating a user ' + id });
    }

    public async signMod(req: Request, res: Response) {
        //SESSION: este es un metodo POST no GET!!!
        console.log(req.body);
        const { id } = req.body.id;
        const result = await userModel.signMod(req.body, req.body.id);
        //res.send('Usuario '+ req.params.id +' actualizado!!!');
        //return res.json({ text: 'updating a user ' + id });
        return res.status(200).json({ message:"Update user "+req.params});
    }

    public async delete(req: Request, res: Response) {
        console.log(req.body);
        //res.send('Usuario '+ req.params.id +' Eliminado!!!');
        const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
        const result = await userModel.eliminar(id);
        // return res.json({ text: 'deleting a user ' + id });
        // res.redirect('../control');
        return res.status(200).json({ message:"Delete user "+req.params});
    }
    //FIN CRUD

    public async control(req: Request, res: Response) {
        if (!req.session.auth) {
            // res.redirect("/");
            req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
            res.redirect("./error");
        }
        //res.send('Controles');
        const usuarios = await userModel.listar();
        // const users = usuarios;
        // console.log(users);
        res.render('partials/controls', { users: usuarios, mi_session: true });
    }
 
    public async procesar(req: Request, res: Response) {
        if (!req.session.auth) {
            // res.redirect("/");
            req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
            res.redirect("./error");
        }
        console.log(req.body);
        let usuario = req.body.usuario;
        var usuarios: any = [];
        console.log(usuario);
        console.log('ACA SALIDA COMPROBACION IF');
        //if (usuario.length > 0) {
        // if(usuario == undefined){
        if(usuario){
            for (let elemento of usuario) {
                const encontrado = await userModel.buscarId(elemento);
                if (encontrado) {
                    usuarios.push(encontrado);
                    console.log(encontrado);
                }
            }
        }
        console.log(usuarios);
        //res.send("Recibido");
        // home es una variable  abajo!!!:
        res.render("partials/seleccion", { usuarios, userLoginOk: req.session.user, mi_session: true });
    }

    public endSession(req: Request, res: Response) {
        console.log(req.body);
        req.session.user = {};
        req.session.auth = false;
        req.session.destroy(() => console.log("Session finalizada"));
        res.redirect("/");
    }

    public showError(req: Request, res: Response) {
        //res.send({ "Usuario y/o contraseña incorrectos": req.body });
        res.render("partials/error");
    }
}

const userController = new UserController();
export default userController;
