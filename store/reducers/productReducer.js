import catJson from '../../json/product-category.json'
import catListJson from '../../json/product-category-list.json'

const reducer = (
  state = {
    category: catJson,
    categoryList: catListJson,
    product: null,
    product_detail: null,
    filteredCategory: null,
    productLength: null,
    pageCount: null,
  },
  action,
) => {
  switch (action.type) {
    case 'CATEGORY':
      return {...state, category: catJson, categoryList: catListJson}
    case 'CATEGORY_DETAIL':
      return {...state, filteredCategory: action.payload}
    case 'PRODUCT':
      return {
        ...state,
        product: action.payload,
        productLength: action.length,
        pageCount: action.pageCount,
      }
    case 'PRODUCT_DETAIL':
      return {...state, product_detail: action.payload}
    default:
      return state
  }
}

export default reducer
