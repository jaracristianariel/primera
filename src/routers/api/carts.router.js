import {  addToCart, checkout, getCart, removeFromCart } from "../../controllers/carts.controller.js";
import RouterHepler from "../../helpers/router.hepler.js";

class CartsRouter extends RouterHepler {
    constructor() {
        super();
        this.init();
    }
    init = () => {
        this.create("/", ["USER", "ADMIN"], addToCart);
        this.read("/", ["USER", "ADMIN"], getCart);
        this.destroy("/:itemId", ["USER", "ADMIN"], removeFromCart);
        this.create("/checkout", ["USER", "ADMIN"], checkout);
        //ACLARACIONNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
        // en la consigna solo pide que el user sea quien pueda crear.. por si me olvido de sacar ADMIN
        //lo dejo porque estoy probando y como admin tambien quiero comprar
    }
}

const cartsRouter = new CartsRouter().getRouter();
export default cartsRouter;