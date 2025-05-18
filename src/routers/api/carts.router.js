import RouterHepler from "../../helpers/router.hepler.js";

class CartRouter extends RouterHepler {
    constructor() {
        super();
        this.init();
    }
    init = () => {
        //logica de creador de carrito
    }
}

const cartsRouter = new CartRouter().getRouter();

export default cartsRouter;