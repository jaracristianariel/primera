import RouterHepler from "../helpers/router.hepler.js";
import { indexView, registerView, loginView, detailsView, profileView, updateView, verifyView, resetView, forgotView, addProductView, checkoutSuccessView, updateProductsView} from "../controllers/views.controller.js";
import { getCart } from "../controllers/carts.controller.js";

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
                this.render("/verify/:email", ["PUBLIC"],verifyView);
                this.render("/add-product", ["ADMIN"], addProductView);
                this.render("/checkout-success", ["USER"], checkoutSuccessView)
                this.render("/cart", ["USER", "ADMIN"], getCart)
                this.render("/update-products", ["ADMIN"], updateProductsView)
                this.render("/forgot", ["PUBLIC"], forgotView);
                this.render("/reset/:email", ["PUBLIC"], resetView);
        }
}

const viewsRouter = new ViewsRouter().getRouter();
export default viewsRouter;