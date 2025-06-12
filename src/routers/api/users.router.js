import { updateUser, sendEmail } from "../../controllers/users.controller.js";
import RouterHepler from "../../helpers/router.hepler.js";

class UserRouter extends RouterHepler {
    constructor() {
        super();
        this.init()
    }
    init = () => {
        this.update("/", ["USER", "ADMIN"], updateUser);
        this.read("/:email", ["PUBLIC"], sendEmail);
    }
}

const usersRouter = new UserRouter().getRouter();
export default usersRouter;
