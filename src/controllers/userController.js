const UserModel = require("../models/userModel");
const Email = require("../helper/email");
require("dotenv").config({ path: ".env" });
const Other = require("../utils/others");
const speakeasy = require("speakeasy");
const QRCodeGenerate = require("qrcode");
const random = require('string-random');

const register = async (req, reply) => {
    const { name, lastName, email, password } = req.body;

    const UserExist = await UserModel.findOne({ email });
    if (UserExist) {
        reply.code(204).send(new Error("Email is already registered"));
    }

    const user = new UserModel({
        name,
        lastName,
        email,
        password
    });
    const NewUser = await user.save();
    if (!NewUser) {
        reply.code(204).send(new Error("An error occurred while trying to register"));
    }
    /* envio de correo*/
    const msg = {
        to: NewUser.email,
        subject: 'Registro exitoso en Kryptopyan',
        layout: "register", //template
        data: { "name": NewUser.name, "link": await generateLinkAccount(NewUser.email) }
    };
    Email.sendEmail(msg);
    /*fin envio de correo*/
    reply.status(201).send({ message: "Successful registration", data: NewUser });
}

//generar un link para confirmar validar el email del usuario.
const generateLinkAccount = async (email) => {

    const token = await UserModel.generateLinkAccount(email);
    return process.env.URI_FRONTEND + process.env.URI_VALIDATE_EMAIL + token;

};

const validateEmail = async (req, reply) => {

    const token = req.token;

    const filter = { email: req.body.email };
    const update = { status: "active" };

    let user = await UserModel.findOneAndUpdate(filter, update, {
        new: true,
        upsert: false,
    });

    if (!user) {
        reply.code(204).send(new Error("The email could not be validated"));
    } else {
        await UserModel.updateOne(
            { "tokens.token": token },
            { $pull: { tokens: { token: token } } }
        );
        reply.status(200).send({ message: "The email was successfully validated", data: null });
    }
}
const logout = async (req, reply) => {
    try {

        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        const loggedOutUser = await req.user.save();
        reply.send({ status: "You are logged out!", user: loggedOutUser });
    } catch (e) {
        console.log("error", e)
        throw new Error(e);
    }
}
const loginUser = async (req, reply) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await UserModel.findOne({ email });

        if (!user) {
            reply.status(401).send({ message: "The email could not found", data: null });
        } else {
            const match = await UserModel.findByCredentials(
                email,
                password,
            );

            if (!match) {
                if (user.attempts >= 2) {
                    if (user.status != "forgot") {
                        await UserModel.findOneAndUpdate(
                            { email: email },
                            { status: "forgot" }
                        );
                    }

                    reply.status(401).send({ message: "You have exceeded the limit of login attempts", data: { forgot: true } });
                } else {
                    reply.status(401).send({ message: "Invalid passwords", data: null });
                }

            } else {
                if (user.status == "blocked" || user.status == "cancelled") {
                    reply.status(401).send({ message: "Su cuenta esta bloqueada", data: { fatal: true } });
                } else {
                    if (user.status == "slink") {
                        reply.status(401).send({ message: "Su cuenta no esta verificada", data: { unverified: true } });
                    } else {
                        if (user.status != "active") {
                            reply.status(401).send({ message: "En proceso de verificacion", data: { warning: true } });

                        } else {
                            let data_result;
                            if (Other.isEmptyString(user.secret_2fa)) {
                                const data = await getDataSetupTFA(user.email);
                                if (data == null) {
                                    //result.msg =  UserMessages.userMessages.tfa_setup.success[language] + err;
                                } else {
                                    //result.msg =
                                    // UserMessages.userMessages.tfa_setup.success[language];
                                    data_result = {
                                        ...data,
                                        tfa: false, //no tiene el 2fa activo
                                        user: {
                                            _id: user._id,
                                            isPerson: isPerson(user) // true es persona natura , false compañia
                                        },
                                    };
                                }
                            } else {
                                // reset attempts
                                await UserModel.findOneAndUpdate(
                                    { email: email },
                                    { attempts: 0 }
                                );
                                data_result = {
                                    user: {
                                        _id: user._id,
                                        isPerson: isPerson(user)
                                    },
                                    tfa: true //si tiene 2fa activo
                                };
                            }
                            reply.status(200).send({ message: "Credentials validated, continue with the flow of 2fa", data: data_result });
                        }
                    }
                }
            }

        }
    } catch (err) {
        console.log("error", err)
        throw new Error(err);
    }
};


const getDataSetupTFA = async (email) => {
    const secret = speakeasy.generateSecret({
        length: 15,
        name: email,
        issuer: "Kryptopyan",
    });

    const url = speakeasy.otpauthURL({
        secret: secret.base32,
        label: email,
        issuer: "Kryptopyan",
        encoding: "base32",
    });

    let user = await UserModel.findOne({ email });
    user.secret_2fa = secret.base32;

    const dataURL = await QRCodeGenerate.toDataURL(url);

    return { secret_2fa: user.secret_2fa, url: dataURL };
};

const login2FA = async (req, reply) => {
    try {

        const email = req.body.email;
        const secret_2fa = req.body?.secret_2fa;
        const code = req.body.code;
        if (!email || !code) {
            reply.status(404).send({ message: "Faltan parametros", data: null });
        }
        let user = await UserModel.findOne(
            { email },
            {
                _id: 1,
                email: 1,
                name: 1,
                lastName: 1,
                status: 1,
                role: 1,
                secret_2fa: 1,
                personal_details: 1,
                documents: 1,
                isPerson: { $eq: ["$personal_details.name_company", null] },
            }
        );

        const twofa = user.secret_2fa ? user.secret_2fa : secret_2fa;
        const isVerified = speakeasy.totp.verify({ //se valida el codigo de 2FA
            secret: twofa,
            encoding: "base32",
            token: code,
        });

        if (isVerified) {
            if (!user.secret_2fa) {
                user.secret_2fa = twofa;
            }
            const token = await user.generateTokenLogin();
            reply.status(200).send({ message: "Login exitoso", data: user, token: token });
        } else {
            reply.status(401).send({ message: "Codigo 2fa inválido", data: null });
        }
    } catch (err) {
        console.log("error", err)
        throw new Error(err);
    }
};
const delete2FA = async (req, reply) => {
    try {
        const email = req.body.email;
        const token = await UserModel.generateLinkAccount(email);
        if (!token) {
            reply.status(401).send({ message: "Error al generar el link", data: null });
        }
        let activationLink = process.env.URI_FRONTEND + process.env.URI_DELETE2FA + token;;

        /* envio de correo*/
        const msg = {
            to: email,
            subject: 'Desactivar el 2FA - Kryptopyan',
            layout: "delete2fa", //template
            data: { "link": activationLink }
        };
        Email.sendEmail(msg);
        /*fin envio de correo*/

        reply.status(200).send({ message: "Envio de correo existoso", data: activationLink });

    } catch (err) {
        console.log("error", err)
        throw new Error(err);
    }
};

const confirmDelete2faUser = async (req, reply) => {
    try {
        let user = await UserModel.deleteTokenAccount(req.token, req.user.email);
        if (user) {
            user.secret_2fa = null;
            await user.save();
        }
        reply.status(200).send({ message: "Desactivado de 2fa exitoso", data: user.public() });

    } catch (err) {
        console.log("error", err)
        throw new Error(err);
    }
};

const generateCodePsw = async (req, reply) => {

    const email = req.body.email;
    let user = await UserModel.findOne({ email }); 
    const code = random(6, {letters: false}); 
    if (user) {
        user.code_psw = code;
        await user.save();
    
        /* envio de correo codigo de generar nueva contraseña*/
        const msg = {
            to:email,
            subject: 'Solcitud cambio de contraseña - Kryptopyan',
            layout: "password_code", //template
            data: { "code": code }
        };
        Email.sendEmail(msg);
    }
    reply.status(200).send({ message: "Se ha enviado el codigo al correo", data: null });
};

const validateCodePsw = async (req, reply) => {

    const email = req.body.email;
    const code = req.body.code;
    let user = await UserModel.findOne({ email });
    
    if (user && user.code_psw === code) {
        user.code_psw = null;
        await user.save();
        reply.status(200).send({ message: "Se ha validado el código", data: null });
        
    }else{
        reply.status(400).send({ message: "El código es inválido", data: code });
    }
    
};
const newPasswordUser = async (req, reply) => {
    try {
        if (req.body.password === req.body.confirm) {
            const result = await UserModel.newPassword(
                req.token,
                req.body.password,
            );
            if (result?.error) {
                reply.status(400).send({ message: result.message, data: null });
            } else {
                let link = process.env.URI_FRONTEND + process.env.URI_LOGIN;
                /* envio de correo*/
                const msg = {
                    to: req.user.email,
                    subject: 'Cambio de contraseña - Kryptopyan',
                    layout: "password_success", //template
                    data: { "link": link }
                };
                Email.sendEmail(msg);
                /*fin envio de correo*/ 

                reply.status(200).send({ message: "Contraseña se ha modificado", data: null });
            }
        } else {
            reply.status(400).send({ message: "Las contraseñas no coinciden", data: null });
        }
    } catch (err) {
        console.log("error", err)
        throw new Error(err);
    }
};

const isPerson = (user) => {
    let response = true;
    /* if( user && user.personal_details ) {
       if( user.personal_details.name_company ) {
         response = false;
       }else if ( user.personal_details.first_name ) {
         response = true;
       }
     }*/
    return response;
}
module.exports = {
    register,
    validateEmail,
    loginUser,
    login2FA,
    logout,
    delete2FA,
    confirmDelete2faUser,
    generateCodePsw,
    validateCodePsw,
    newPasswordUser,
};
