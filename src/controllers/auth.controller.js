import { compareHash, createHash } from "../helpers/hash.helper.js"
import resetPass from "../helpers/resetPass.helper.js"
import { createToken, verifyToken } from "../helpers/token.hepler.js"
import { usersService } from "../services/service.js"


//vamos a hacerlo con clase para variar
class AuthController {
    registerCb = async (req, res) => {
        const { _id } = req.user
        res.json201(_id, "Registered")
    }
    loginCb = async (req, res) => {
        const { _id } = req.user
        const opts = { maxAge: 7 * 24 * 60 * 60 * 1000 };
        res.cookie("token", req.user.token, opts).json(_id, "Logged in");
    }
    signoutCb = (req, res) => res.clearCookie("token").json200(req.user._id, "Sign Out");
    onlineCb = (req, res) => {
        const user = req.user;
        const { name, email, role } = req.user;
        if (!user) {
            res.json401()
        }        
        res.json200({ name, email, role }, "Is Online");
    }
    badAuth = (req, res) => res.json401();
    forbidden = (req, res) => res.json403();
    currentCb = (req, res) => res.json200(null, "Is Onlineee");
    verifyUserCb = async(req, res) => {
        const { email, verifyCode } = req.params;
        const user = await usersService.readBy({ email, verifyCode });
        if(!user) {
            res.json404()
        }
        await usersService.updateById(user._id, { isVerified: true });
        res.json200(user, "verified")
    }
    resetPasswordCb = async(req, res) => {
        const { email } = req.params;
        const { password } = req.body;
        const user = await usersService.readBy({ email });
        if(!user) {
            res.json404()
        }
        const isSame = await compareHash(password, user.password);
        if (isSame) return res.json401("no podes usar la misma contraseña");
        const hashed = createHash(password);
        await usersService.updateById(user._id, { password: hashed} );
        res.json200(user, "contraseña actualizada correctamente")
    }
    requestResetCb = async(req, res) => {
        const { email } = req.body;
        console.log("a ver si llega el correo ", email)
        const user = await usersService.readBy({ email });
        const token = createToken({ email }, "1h");
        await resetPass(email, token);
        res.json200(null, "correo enviado")
    }
}

const authController = new AuthController();
export default authController;
//desestructuracion desde una clase tiene desventajas que no son una buena practica
//const { registerCb, loginCb, signoutCb, onlineCb, badAuth, forbidden, currentCb } = authController;
//export { registerCb, loginCb, signoutCb, onlineCb, badAuth, forbidden, currentCb };