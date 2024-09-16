module.exports = function (app) {
    app.get('/', (_, res) => res.send("Hello World!"));
    app.use('/api/admins', require('../admin/adminRoutes.js'))
    // USER route shu yerga chaqiriladi...
    app.use('/api/products', require('../product/productRoutes.js'))
    app.use('/api/categries' , require('../category/categoryRoutes.js'))
};