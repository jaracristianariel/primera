import { Router } from "express";
import { createCb, createSignedCb, readCb, readSignedCb, clearCb } from "../../controllers/cookies.controller.js"

const cookiesRouter = Router();

//solo estamos ocupando get para el savegador. el codigo verdadero lleva post/get/delete
cookiesRouter.get("/create", createCb);//decia get
cookiesRouter.get("/create-signed", createSignedCb);//decia get
cookiesRouter.get("/read", readCb);
cookiesRouter.get("/read-signed", readSignedCb);
cookiesRouter.get("/clear", clearCb) //decia get

export default cookiesRouter;