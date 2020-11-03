import axios from 'axios'
import constant from '../../constant'
import catListJson from '../../json/product-category-list.json'

export const setProductNull = () => {
  return (dispatch) => {
    dispatch({type: 'PRODUCT', payload: null})
  }
}

export const getProduct = (id, multiple, pages) => {
  return (dispatch) => {
    axios.get(`${constant.BASE_URL}/catalog/product_variant`).then((response) => {
      let filteredProduct = []
      const idParsed = parseFloat(id)
      if (idParsed !== 12) {
        filteredProduct = response.data.result.product_template.filter((res) => {
          return res.categ_id === idParsed && res.buyer_app_enable === true
        })
      } else {
        filteredProduct = response.data.result.product_template.filter((res) => {
          return res.categ_id < idParsed && res.buyer_app_enable === true
        })
      }
      let arrayPagination = []
      if (filteredProduct.length >= 10) {
        if (pages > filteredProduct.length) {
          arrayPagination = []
          for (let j = multiple; j < multiple + (filteredProduct.length % 10); j += 1) {
            arrayPagination.push(filteredProduct[j])
          }
        } else {
          for (let i = multiple; i < pages; i += 1) {
            arrayPagination.push(filteredProduct[i])
          }
        }
      } else {
        arrayPagination = []
      }
      const finalArray = arrayPagination.length !== 0 ? arrayPagination : filteredProduct
      const count = filteredProduct ? parseInt(filteredProduct.length / 10 + 1, 10) : 0
      if (response) {
        dispatch({
          type: 'PRODUCT',
          payload: finalArray,
          length: filteredProduct.length,
          pageCount: count,
        })
      }
    })
  }
}

export const getProductSorted = (id, params, multiple, pages) => {
  return (dispatch) => {
    axios.get(`${constant.BASE_URL}/catalog/product_variant`).then((response) => {
      let filteredProduct = []
      const idParsed = parseFloat(id)
      if (idParsed !== 12) {
        filteredProduct = response.data.result.product_template.filter((res) => {
          return res.categ_id === idParsed && res.buyer_app_enable === true
        })
      } else {
        filteredProduct = response.data.result.product_template.filter((res) => {
          return res.categ_id < idParsed && res.buyer_app_enable === true
        })
      }

      if (params === 'aZ') {
        filteredProduct.sort((a, b) => {
          return a.name > b.name ? 1 : -1
        })
      } else if (params === 'zA') {
        filteredProduct.sort((a, b) => {
          return a.name < b.name ? 1 : -1
        })
      } else if (params === 'low') {
        filteredProduct.sort((a, b) => {
          return a.list_price > b.list_price ? 1 : -1
        })
      } else {
        filteredProduct.sort((a, b) => {
          return a.list_price < b.list_price ? 1 : -1
        })
      }
      let arrayPagination = []
      if (filteredProduct.length >= 10) {
        if (pages > filteredProduct.length) {
          arrayPagination = []
          for (let j = multiple; j < multiple + (filteredProduct.length % 10); j += 1) {
            arrayPagination.push(filteredProduct[j])
          }
        } else {
          for (let i = multiple; i < pages; i += 1) {
            arrayPagination.push(filteredProduct[i])
          }
        }
      } else {
        arrayPagination = []
      }
      const finalArray = arrayPagination.length !== 0 ? arrayPagination : filteredProduct
      const count = filteredProduct ? parseInt(filteredProduct.length / 10 + 1, 10) : 0
      if (response) {
        dispatch({
          type: 'PRODUCT',
          payload: finalArray,
          length: filteredProduct.length,
          pageCount: count,
        })
      } else {
        dispatch({type: 'PRODUCT', payload: false})
      }
    })
  }
}

export const getProductDetail = (id) => {
  return (dispatch) => {
    axios.get(`${constant.BASE_URL}/catalog/product_variant`).then((response) => {
      const filteredProduct = response.data.result.product_template.filter((res) => {
        return res.id === parseFloat(id)
      })
      if (response) {
        dispatch({type: 'PRODUCT_DETAIL', payload: filteredProduct})
      } else {
        dispatch({type: 'PRODUCT_DETAIL', payload: false})
      }
    })
  }
}

export const getCategoryDetail = (id) => {
  return (dispatch) => {
    const filteredCategory = catListJson.result.filter((res) => {
      return res.id === parseFloat(id)
    })
    if (filteredCategory) {
      dispatch({type: 'CATEGORY_DETAIL', payload: filteredCategory})
    } else {
      dispatch({type: 'CATEGORY_DETAIL', payload: false})
    }
  }
}

const productAction = 'productAction'
export default productAction
