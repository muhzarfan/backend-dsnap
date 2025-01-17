const Joi = require('joi');

exports.validateOrder = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        subject: Joi.string().required(),
        date: Joi.date().required(),
        message: Joi.string().required(),
        no_telepon: Joi.string().pattern(/^\d+$/).required(),
        jenis_paket: Joi.string().valid('Big', 'Medium', 'Small').required()
    });
    return schema.validate(data);
};

exports.validatePortfolio = (data) => {
    const schema = Joi.object({
        eventName: Joi.string().required(),
        imageUrl: Joi.string().uri().required(),
    });
    return schema.validate(data);
};
