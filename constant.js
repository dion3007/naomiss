const dev = {
  BASE_URL: 'https://tango.aruna.id/api/v1',
  IMG_URL: 'https://tango.aruna.id/api/v2/image/product.template/image_1920/',
  STATUS: 'dev',
}

const stag = {
  BASE_URL: 'https://tango.aruna.id/api/v1',
  IMG_URL: 'https://tango.aruna.id/api/v2/image/product.template/image_1920/',
  STATUS: 'stag',
}

const prod = {
  BASE_URL: 'https://tango.aruna.id/api/v1',
  IMG_URL: 'https://tango.aruna.id/api/v2/image/product.template/image_1920/',
  STATUS: 'prod',
}

const constant = (() => {
  if (process.env.ENVIRONMENT === 'dev') {
    return dev
  }
  if (process.env.ENVIRONMENT === 'staging') {
    return stag
  }
  return prod
})()

export default constant
