import RouterHepler from "../../helpers/router.hepler.js";
import passport from "../../middlewares/passport.mid.js";
import { usersManager } from "../../data/managers/mongo/manager.mongo.js";

const updateUser = async (req, res, next) => {
        const { method, originalUrl: url } = req;
        const data = req.body;
        const { _id } = req.user;
        const response = await usersManager.updateById(_id, data);
        res.status(200).json({ response, method, url })
}


class UserRouter extends RouterHepler {
    constructor() {
        super();
        this.init()
    }
    init = () => {
        this.update("/", passport.authenticate("user", { session: false }), updateUser);
    }
}

const usersRouter = new UserRouter().getRouter();
export default usersRouter;