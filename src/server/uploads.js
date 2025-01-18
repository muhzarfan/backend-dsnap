import formidable from 'formidable';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function parseForm(req) {
    return new Promise((resolve, reject) => {
        const form = formidable({
            maxFileSize: 5 * 1024 * 1024, // 5MB
        });

        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });
}
