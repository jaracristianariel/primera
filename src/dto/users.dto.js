const { PERSISTENCE } = process.env;
import crypto from "crypto";
import { createHash } from "../helpers/hash.helper.js"

class UsersDTO {
    constructor(data){
        if (PERSISTENCE!=="mongo") {
            this._id = crypto.randomBytes(12).toString("hex");
        }
        this.name = data.name;
        this.date = data.date;
        this.city = data.city;
        this.email = data.email;
        this.password = createHash(data.password);
        this.avatar = data.avatar || "https://gravatar.com/avatar/248bdefecfb4664b5b2e8335c61a66f5?s=400&d=robohash&r=x";
        this.role = data.role || "USER";
        this.verifyCode = data.verifyCode || crypto.randomBytes(12).toString("hex");
        if (PERSISTENCE!=="mongo") {
            this.isVerified = data.isVerified || false;
            this.createdAt = new Date();
            this.updatedAt = new Date();
        }
    }
}

export default UsersDTO;