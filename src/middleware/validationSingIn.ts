import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import userModel from '../models/userModels';

export async function validationSingIn(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const errors = validationResult(req);
    console.log(errors.array());
    if (!errors.isEmpty()) {
        return res.render("partials/signinForm", {
            error: errors.array()
        })
    }
    next();
}