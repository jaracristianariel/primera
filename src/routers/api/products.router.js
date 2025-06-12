import RouterHepler from "../../helpers/router.hepler.js";
import { createOne, readAll, readById, updateById, destroyById, updateProduct } from "../../controllers/products.controller.js"

class ProductsRouter extends RouterHepler {
    constructor() {
        super();
        this.init()
    }
    init = () => {
        this.create("/", ["ADMIN"], createOne);
        this.read("/", ["PUBLIC"], readAll);
        this.read("/:id", ["PUBLIC"], readById);
        this.update("/:id", ["ADMIN"], updateById);
        this.destroy("/:id", ["ADMIN"], destroyById);
        this.update("/:pid", ["ADMIN"], updateProduct)
    }
}

const productsRouter = new ProductsRouter().getRouter();
export default productsRouter;