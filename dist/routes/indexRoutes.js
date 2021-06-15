"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //    this.router.get('/',(req:Request,res:Response)=> res.send('Hola Mundo!!!'));
        this.router.get('/', (req, res) => {
            // res.send('Hola MUndo!');
            req.session.auth = false;
            req.session.user = {};
            res.render("partials/principal");
        });
    }
}
//Exportamos el enrutador con 
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
//# sourceMappingURL=indexRoutes.js.map