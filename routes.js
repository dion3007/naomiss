const routes = require('next-routes')

module.exports = routes()
  .add('nothing', '#')
  .add('index', '/')
  .add('detail', '/detail')
  .add('product', '/product')
  .add('cart', '/cart')
