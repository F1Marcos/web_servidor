"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinSchema = void 0;
const express_validator_1 = require("express-validator");
const schema = [
    express_validator_1.body('usuario').not().isEmpty().withMessage('Usuario no existe'),
    //body('nombre').withMessage('Debe cargar un nombre entre 3 y 10 caracteres'),
    express_validator_1.body('password').isLength({ min: 1 }).withMessage('Password debe tener mínimo 5 caracteres'),
];
exports.signinSchema = schema;
//# sourceMappingURL=signin-schema.js.map