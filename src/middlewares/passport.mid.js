import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { createHash, compareHash } from "../helpers/hash.helper.js";
import { usersRepository } from "../repositories/repository.js";
import { createToken } from "../helpers/token.hepler.js";
import verifyEmail from "../helpers/verifyEmail.helper.js";

const callbackURL = `${process.env.BASE_URL}/api/auth/google/redirect`
//onst callbackURL = "http://localhost:8000/api/auth/google/redirect"

passport.use(
    //nombre de la estrategia de autenticacion/autorizacion
    "register",
    //estrategia de autenticacion/autorizacion
    new LocalStrategy(
        //el objeto de configuracio  de la estrategia
        { passReqToCallback: true, usernameField: "email" },//passwordField: "pass" (por si en el form la contreseña se llama "pass")
        //calback con la logica necesaria para resolver la estrategia
        async (req, email, password, done) => {
            try {
                if (!req.body.city) {
                    const error = new Error("invalid data");
                    error.statusCode = 400;
                    throw error;
                }
                let user = await usersRepository.readBy({ email })
                if (user) {
                    done(null, null, { message:"invalid credential", statusCode: 401 })
                }
                //req.body.password = createHash(password)
                user = await usersRepository.createOne(req.body);
                await verifyEmail(user.email, user.verifyCode)
                //el 1er parametro de done es el error (si ocurre) y el 2do parametro son los datos del usuario 
                // que se guardan en el objeto de requerimiento, es decir que a partir de que se aplica este middelware
                //existe req.user con los datos del usuario
                done(null, user)
            } catch (error) {
                done(error)
            }
        }
    )
)
passport.use(
    "login",
    new LocalStrategy(
        { passReqToCallback: true, usernameField: "email" },
        async (req, email, password, done) => {
            try {
                let user = await usersRepository.readBy({ email })
                if (!user) {
                    done(null, null, { message:"invalid credential", statusCode: 401 })
                }
                const verifyPass = compareHash(password, user.password)
                if (!verifyPass) {
                    done(null, null, { message:"invalid credential", statusCode: 401 })
                }
                const { isVerified } = user;
                if (!isVerified) {
                    return done(null, null, { message: "please verify your account!", statusCode: 401 })
                }
                const data = {
                    user_id: user._id,
                    email: user.email,
                    role: user.role,
                }
                const token = createToken(data)
                user.token = token;
                done(null, user)
            } catch (error) {
                done(error)
            }
        }
    )
)
passport.use(
    "user",
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
            secretOrKey: process.env.SECRET
        },
        async (data, done) => {
            try {
                const { user_id, email, role } = data
                const user = await usersRepository.readBy({ _id: user_id, email, role })
                if (!user) {
                    done(null, null, { message:"Forbidden", statusCode: 403 })
                }
                done(null, user);
            } catch (error) {
                done(error)
            }
        }
    )
)
passport.use(
    "adminn",
    new JwtStrategy(
        { jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]), secretOrKey: process.env.SECRET },
        async (data, done) => {
            try {
                const { user_id, email, role } = data
                const user = await usersRepository.readBy({ _id: user_id, email, role })
                if (!user || user.role !== "ADMIN") {
                    done(null, null, { message:"Forbidden", statusCode: 403 })
                }
                done(null, user)
            } catch (error) {
                done(error)
            }
        }
    )
)
passport.use(
    "google", 
    new GoogleStrategy(
        { clientID: process.env.GOOGLE_ID, clientSecret: process.env.GOOGLE_SECRET, callbackURL },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log(profile);
                const { email, name, picture, id } = profile
                let user = await usersRepository.readBy({ email: id })
                if (!user) {
                    user = {
                        email: id,
                        name: name.givenName,
                        avatar: picture,
                        password: createHash(email),
                        city: "Google"
                    }
                    user = await usersRepository.createOne(user)
                }
                const data = {
                    user_id: user._id,
                    email: user.email,
                    role: user.role,
                }
                const token = createToken(data)
                user.token = token;
                done(null, user)
            } catch (error) {
                done(error)
            }
        }
    )
)

passport.use(
    "current",
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
            secretOrKey: process.env.SECRET
        },
        async (data, done) => {
            try {
                const { user_id, email, role, city, name } = data
                const user = await usersRepository.readBy({ _id: user_id, email, role, city, name })
                if (!user) {
                    done(null, null, { message:"Forbidden", statusCode: 403 })
                }
                done(null, user);
            } catch (error) {
                done(error)
            }
        }
    )
)

export default passport;