import sendEmailHelper from "../helpers/email.helper.js";
import { usersService } from "../services/service.js";

const updateUser = async (req, res, next) => {
        const { method, originalUrl: url } = req;
        const data = req.body;
        const { _id } = req.user;
        const response = await usersService.updateById(_id, data);
        res.status(200).json({ response, method, url })
}
const sendEmail = async (req, res, next) => {
        const { method, originalUrl: url } = req;
        const { email } = req.params;
        await sendEmailHelper(email);
        res.status(200).json({ response: "email send", method, url })
}

export { updateUser, sendEmail };