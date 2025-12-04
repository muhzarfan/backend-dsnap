const Joi = require('joi');

/**
 * Fungsi validasi untuk data pemesanan (Order).
 * Memastikan semua field yang diperlukan ada dan berformat benar 
 * sebelum data disimpan ke database.
 * @param {object} data - Objek data pesanan dari req.body.
 * @returns {Joi.ValidationResult} Hasil dari validasi Joi.
 */
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

/**
 * Fungsi validasi untuk data Portofolio.
 * Saat ini skema ini mungkin digunakan untuk memvalidasi data jika upload file 
 * dilakukan secara terpisah, atau jika `imageUrl` diisi dengan URL public secara manual.
 * (Catatan: Handler.js menggunakan multer/storage, sehingga validasi ini mungkin tidak digunakan 
 * secara langsung saat create/update di handler, tetapi berguna untuk validasi data inti).
 * @param {object} data - Objek data Portofolio.
 * @returns {Joi.ValidationResult} Hasil dari validasi Joi.
 */
exports.validatePortfolio = (data) => {
    const schema = Joi.object({
        eventName: Joi.string().required(),
        imageUrl: Joi.string().uri().required(),
    });
    return schema.validate(data);
};
