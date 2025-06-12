import dbConnect from "../helpers/dbConnect.helper.js";

const { PERSISTENCE, LINK_DB } = process.env;

let dao = {}

switch (PERSISTENCE) {
    case "memory":
        //si la persistencia es la memoria debo cargar con el objeto dao con los daos de memoria
        {
            console.log("connected to memory")
            const { productsManager, cartsManager, usersManager } = await import("./memory/dao.memory.js");
            dao = { productsManager, cartsManager, usersManager }
        }
        break;
    case "fs":
        //si la persistencia es fs debo cargar con el objeto dao con los daos de fs
        {
            console.log("connected to fs")
            const { productsManager, cartsManager, usersManager } = await import("./fs/dao.fs.js")
            dao = { productsManager, cartsManager, usersManager }
        }
        break;
    //case "mysql":
    //break
    default: /* por defaul dejamos mongo */
        {
            await dbConnect(LINK_DB)
            const { productsManager, cartsManager, usersManager } = await import("./mongo/dao.mongo.js")
            dao = { productsManager, cartsManager, usersManager }
        }
        break;
}

const { productsManager, cartsManager, usersManager } = dao;
export { productsManager, cartsManager, usersManager };
export default dao;