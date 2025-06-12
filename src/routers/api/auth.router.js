import RouterHepler from "../../helpers/router.hepler.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import authController from "../../controllers/auth.controller.js";

class AuthRouter extends RouterHepler {
        constructor() {
                super();
                this.init()
        }
        init = () => {
                this.create("/register", ["PUBLIC"], passportCb("register"), authController.registerCb);//las ultimas callback siempre controladores
                this.create("/login", ["PUBLIC"], passportCb("login"), authController.loginCb);
                this.create("/signout", ["USER", "ADMIN"], authController.signoutCb);
                this.create("/online", ["USER", "ADMIN"], authController.onlineCb);
                this.read("/google", ["PUBLIC"], passportCb("google", { scope: ["email", "profile"] }));//post
                this.read("/google/redirect", ["PUBLIC"], passportCb("google"), authController.loginCb);
                this.read("/bad-auth", ["PUBLIC"], authController.badAuth);
                this.read("/forbidden", ["PUBLIC"], authController.forbidden);
                this.read("/current", ["ADMIN"], authController.currentCb);
                this.read("/verify/:email/:verifyCode", ["PUBLIC"], authController.verifyUserCb)
                this.create("/request-reset", ["PUBLIC"], authController.requestResetCb);
                this.update("/reset/:email", ["PUBLIC"], authController.resetPasswordCb);
        }
}

const authRouter = new AuthRouter().getRouter();
export default authRouter;