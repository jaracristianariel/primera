import jwt from "jsonwebtoken";

const createToken = (data, expiresIn = 7 * 24 * 60 * 60 ) => {
    try {
        const token = jwt.sign(
            //informacion a tokenizar
            data,
            //clave secreta para encriptar
            process.env.SECRET,
            //objeto de configuracion de la firma
            { expiresIn }
        )
        return token
    } catch (error) {
        error.statusCode = 401
        throw error
    }
}
const verifyToken = (token) => {
    try {
        const data = jwt.verify(
            //token a destokenizar
            token,
            //llave secreta para desemprictar
            process.env.SECRET
        )
        return data;
    } catch (error) {
        error.statusCode = 403
        throw error
    }
}

export { createToken, verifyToken };