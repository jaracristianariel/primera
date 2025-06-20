
const createCb = (req, res, next) => {
    try {
        const maxAge = 7 * 20 * 60 * 60 * 1000
        //const maxAge = 5 * 1000
        const message = "cookie vence en 7 dias";
        return res.status(201).cookie("mode", "dark", { maxAge }).cookie("role", "admin", { maxAge }).json(message)
    } catch (error) {
        next(error)
    }
};
const createSignedCb = (req, res, next) => {
    try {
        const maxAge = 7 * 20 * 60 * 60 * 1000
        //const maxAge = 5 * 1000
        const message = "cookie vence en 7 dias";
        return res
            .status(201)
            .cookie("user", "ari", { maxAge, signed: true })
            .cookie("idea", "admin", { maxAge, signed: true })
            .json({ message })
    } catch (error) {
        next(error)
    }
};
const readCb = (req, res, next) => {
    try {
        const cookies = req.cookies;
        return res.status(200).json({ cookies })
    } catch (error) {
        next(error)
    }
}
const readSignedCb = (req, res, next) => {
    try {
        const cookies = req.signedCookies;
        return res.status(200).json({ cookies })
    } catch (error) {
        next(error)
    }
}
const clearCb = (req, res, next) => {
    try {
        const message = "se elimino la cookie";
        return res.status(200).clearCookie("user").clearCookie("role").json({ message })
    } catch (error) {
        next(error)
    }
}

export { createCb, createSignedCb, readCb, readSignedCb, clearCb };