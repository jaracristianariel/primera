import RouterHepler from "../helpers/router.hepler.js";
import viewsRouter from "./views.router.js";
import apiRouter from "./api.router.js";

class IndexRouter extends RouterHepler {
    constructor() {
        super();
        this.init();
    }
    init = () => {
        this.use("/", viewsRouter);
        this.use("/api", apiRouter)
    }
}

const indexRouter = new IndexRouter().getRouter();
export default indexRouter;