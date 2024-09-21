module.exports = function (app) {
    app.get('/', (_, res) => res.send("Hello World!"));
    app.use('/api/admins', require('../admin/adminRoutes.js'))
    // USER route shu yerga chaqiriladi...
    app.use('/api/products', require('../product/productRoutes.js'))
    // CATEGORY route shu yerga chaqiriladi...
    app.use('/api/basket', require('../basket/basket.routes.js'))

};