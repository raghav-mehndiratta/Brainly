import { z } from "zod";
import { Request, Response, NextFunction } from "express";
const JWT_SECRET = process.env.JWT_SECRET
import jwt, { JwtPayload } from "jsonwebtoken"

// ✅ validateInput() is a middleware generator — not the middleware itself, but a function that returns a middleware.

// export function validateInput(schema: z.AnyZodObject) {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const parsed = schema.safeParse(req.body);

//     if (!parsed.success) {
//         res.status(400).json({ message: "Incorrect input data format", Error: parsed.error.issues[0].message })
//         return;
//     }

//     // Overwrite req.body with the parsed (safe) data
//     // Even if req.body had extra or malicious fields, Zod's .safeParse() strips them out by default (unless you allow unknown keys explicitly).
//     req.body = parsed.data;
//     next();
//   };
// }

/* middleware is always expected to return void */
export const userMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    // ? means -> "Only access this property/method if the value before it is not null or undefined else return undefined."
    if (!authHeader) { // This line is equivalent to: if (!(authHeader && authHeader.startsWith("Bearer ")))
        res.status(401).json({ message: "Invalid or missing token" });
        return;
    }

    const token = authHeader;

    try {
        const decodedInfo = jwt.verify(token, JWT_SECRET as string);
        if (decodedInfo) {
            req.userId = (decodedInfo as JwtPayload).id; // optional: attach user info to request
            next();
        }
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
        return;
    }
}