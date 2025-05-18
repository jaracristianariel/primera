import RouterHepler from "../helpers/router.hepler.js";
import { productsManager } from "../data/managers/mongo/manager.mongo.js";


const indexView = async (req, res) => {
        const products = await productsManager.readAll()
        res.status(200).render("index", { products })
}
const registerView = async (req, res) => {
        res.status(200).render("register");
}
const loginView = async (req, res) => {
        res.status(200).render("login");
}
const detailsView = async (req, res) => {
        const { pid } = req.params;
        const product = await productsManager.readById(pid)
        res.status(200).render("details", { product });
}
const profileView = async (req, res) => {
        const { user } = req;
        res.status(200).render("profile", { user });
}
const updateView = async (req, res) => {
        res.status(200).render("update-user");
}

const currentView = async (req, res) => {
        const { user } = req;
        res.status(200).render("current", { user });
}

class ViewsRouter extends RouterHepler {
        constructor() {
                super();
                this.init();
        }
        init = () => {
                this.render("/", ["PUBLIC"], indexView);
                this.render("/register", ["PUBLIC"], registerView);
                this.render("/login", ["PUBLIC"], loginView);
                this.render("/details/:pid", ["PUBLIC"], detailsView);
                this.render("/profile", ["USER", "ADMIN"], profileView);
                this.render("/update-user", ["USER", "ADMIN"], updateView);
                this.render("/sessions/current", ["ADMIN"], currentView)
        }
}

const viewsRouter = new ViewsRouter().getRouter();
export default viewsRouter;