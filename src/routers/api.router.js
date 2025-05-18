import RouterHepler from "../helpers/router.hepler.js";
import productsRouter from "./api/products.router.js";
import cartsRouter from "./api/carts.router.js";
import usersRouter from "./api/users.router.js";
import cookiesRouter from "./api/cookies.router.js";
import sessionsRouter from "./api/sessions.router.js";
import authRouter from "./api/auth.router.js";

class ApiRouter extends RouterHepler {
    constructor() {
        super();
        this.init();
    }
    init = () => {
        this.use("/products", productsRouter);
        this.use("/carts", cartsRouter);
        this.use("/users", usersRouter);
        this.use("/cookies", cookiesRouter);
        this.use("/sessions", sessionsRouter);
        this.use("/auth", authRouter);
        this.use("/sessions", authRouter);
    }
}

const apiRouter = new ApiRouter().getRouter();
export default apiRouter;