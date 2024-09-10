const mongoose = require('mongoose');

module.exports = function (app) {
    const port = process.env.PORT || 8000;

    mongoose.connect('mongodb+srv://elmurodvokhidov:oxBMUY7KrwucpW9c@crow-shop.u5kow.mongodb.net/?retryWrites=true&w=majority&appName=crow-shop')
        .then(() => {
            console.log("MongoDb ga ulanish hosil qilindi...");
            app.listen(port, () => console.log(`${port} ni eshitishni boshladim...`));
        })
        .catch((err) => console.log("MongoDb ga ulanishda XATOLIK: " + err));
};