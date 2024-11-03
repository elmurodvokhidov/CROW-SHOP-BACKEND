module.exports = function (app) {
    app.get('/', (_, res) => res.send("Hello World!"));
    app.use('/api/admins', require('../admin/adminRoutes.js'))
    // USER route shu yerga chaqiriladi...
    app.use('/api/products', require('../product/productRoutes.js'))
    app.use('/api/categories', require('../category/categoryRoutes.js'))
    app.use('/api/basket', require('../basket/basket.routes.js'))
    app.use("/api/comments", require("../comments/commentRoute.js"))
    app.use("/api/wishlist", require("../wishlist/likesRoute.js"))
};