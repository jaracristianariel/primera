import { verifyToken } from "../helpers/token.hepler.js";
import { productsService } from "../services/service.js";

const indexView = async (req, res) => {
        const products = await productsService.readAll();
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
        const product = await productsService.readById(pid);
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
const verifyView = async (req, res) => {
        const { email } = req.params;
        res.status(200).render("verify", { email });
}
const resetView = async (req, res) => {
        const { email:token } = req.params; 
        const decoded = verifyToken(token)
        res.status(200).render("reset", { email:decoded.email});
}
const forgotView = async (req, res) => {
        const { email } = req.params;
        res.status(200).render("forgot", { email });
}
const addProductView = async (req, res) => {
        const { user } = req;
        res.status(200).render("add-product", { user });
}
const checkoutSuccessView = async (req, res) => {
        res.status(200).render("checkout-success");
}
const updateProductsView = async (req, res) => {
        const products = await productsService.readAll();
        res.status(200).render("update-products", { products });
}


export { indexView, registerView, loginView, detailsView, profileView, updateView, updateProductsView, 
        currentView, verifyView, resetView, forgotView, addProductView, checkoutSuccessView };