import { usersManager } from "../data/managers/mongo/manager.mongo.js";
import { verifyToken } from "../helpers/token.hepler.js";

const setupPolicies = (policies) => async (req, res, next) => {
    try {
        console.log(typeof policies, policies)
        if (!Array.isArray(policies)){
            throw Error("policies must be an array")
        }
        //console.log(policies)
        if (policies.includes("PUBLIC")) return next();
        const token = req?.cookies?.token;
        if (!token) return res.json401();
        const data = verifyToken(token);
        const { user_id, email, role } = data;
        if (!user_id || !email || !role) return res.json401();
        const allowedRoles = {
            USER: policies.includes("USER"),
            ADMIN: policies.includes("ADMIN")
        }
        if (!allowedRoles[role]) return json401();
        const user = await usersManager.readById(user_id);
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}

export default setupPolicies;