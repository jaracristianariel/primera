import RouterHepler from "../../helpers/router.hepler.js";
import passportCb from "../../middlewares/passportCb.mid.js";

const registerCb = async (req, res) => {
        const { _id } = req.user
        res.json201(_id, "Registered")
}
const loginCb = async (req, res) => {
        const { _id } = req.user
        const opts = { maxAge: 7 * 24 * 60 * 60 * 1000 };
        res.cookie("token", req.user.token, opts).json(_id, "Logged in");
}
const signoutCb = (req, res) => res.clearCookie("token").json200(req.user._id, "Sign Out");
const onlineCb = (req, res) => res.json200(null, "Is Online");
const badAuth = (req, res) => res.json401();
const forbidden = (req, res) => res.json403();
const currentCb = (req, res) => res.json200(null, "Is Onlineee");

// const optsBad = { session: false, failureRedirect: "/api/auth/bad-auth" };
// const optsForbidden = { session: false, failureRedirect: "/api/auth/forbidden" };

class AuthRouter extends RouterHepler {
        constructor() {
                super();
                this.init()
        }
        init = () => {
                this.create("/register", ["PUBLIC"], passportCb("register"), registerCb);
                this.create("/login", ["PUBLIC"], passportCb("login"), loginCb);
                this.create("/signout", ["USER", "ADMIN"], signoutCb);
                this.create("/online", ["USER", "ADMIN"], onlineCb);
                this.read("/google", ["PUBLIC"], passportCb("google", { scope: ["email", "profile"] }));//post
                this.read("/google/redirect", ["PUBLIC"], passportCb("google"), loginCb)
                this.read("/bad-auth", ["PUBLIC"], badAuth);
                this.read("/forbidden", ["PUBLIC"], forbidden);
                this.read("/current", ["ADMIN"], currentCb)
        }
}

const authRouter = new AuthRouter().getRouter();
export default authRouter;