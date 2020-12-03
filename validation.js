const Joi = require('@hapi/joi');

//Register Validation
const registerValidation = (data) =>{
const schema = Joi.object({
    name: Joi.string()
        .required(),
    email: Joi.string()
        .min(3)
        .email()
        .required(),
    password: Joi.string()
        .min(6)
        .required()
});
return schema.validate(data)
};

//Login Validation
const loginValidation = (data) =>{
const loginSchema = Joi.object({
        email: Joi.string()
            .min(3)
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .required()
});
    return loginSchema.validate(data)
};


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;