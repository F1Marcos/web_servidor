import {body} from 'express-validator';

const schema = [
    body('usuario').not().isEmpty().withMessage('Usuario no existe'),
    //body('nombre').withMessage('Debe cargar un nombre entre 3 y 10 caracteres'),
    body('password').isLength( {min: 1}).withMessage('Password debe tener mínimo 5 caracteres'),
];
 
export {schema as signinSchema };