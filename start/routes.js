module.exports = function (app) {
    app.get('/', (_, res) => res.send("Hello World!"));
    // ADMIN route shu yerga chaqiriladi...
    // app.use('/api/user', require('../user/userRoutes.js'))
    app.use('/api/products', require('../product/productRoutes.js'))
    // CATEGORY route shu yerga chaqiriladi...
};