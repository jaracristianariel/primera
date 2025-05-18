import { Router } from "express";

const sessionsRouter = Router();

const createCb = (req, res, next) => {
    try {
        req.session.role = "ADMIN"
        req.session.mode = "dark"
        const message = "Sessions vence en 7 dias";
        return res.status(201).json({ message })
    } catch (error) {
        next(error)
    }
}
const readCb = (req, res, next) => {
    try {
        const session = req.session
        return res.status(200).json({ session })
    } catch (error) {
        next(error)
    }
}
const destroyCb = (req, res, next) => {
    try {
        req.session.destroy();
        const message = "session eliminada"
        return res.status(200).json({ message })
    } catch (error) {
        next(error)
    }
}

sessionsRouter.get("/create", createCb);//no es get. es post
sessionsRouter.get("/read", readCb);
sessionsRouter.get("/destroy", destroyCb);

export default sessionsRouter;