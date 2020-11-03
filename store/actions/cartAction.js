import axios from 'axios'
import constant from '../../constant'
import catJson from '../../json/product-category.json'

export const closeCart = () => {
  return (dispatch) => {
    dispatch({type: 'ADD_TO_CART', payload: false})
  }
}

export const setDisable = () => {
  return (dispatch) => {
    dispatch({type: 'ADD_TO_CART', payload: false, error: true})
  }
}

export const setDisableFalse = () => {
  return (dispatch) => {
    dispatch({type: 'ADD_TO_CART', payload: false, error: false})
  }
}

export const closeNotify = () => {
  return (dispatch) => {
    dispatch({type: 'SUBMIT_INQUIRY', payload: false})
  }
}

export const submitCart = (form, emailForm, phoneForm) => {
  return (dispatch) => {
    let array = []
    array = JSON.parse(localStorage.getItem('cart'))
    const addressRegx = form.address.replace(/[\r\n]+/gm, '')
    try {
      axios({
        method: 'post',
        url: `${constant.BASE_URL}/inquiry`,
        headers: {
          'content-type': 'application/json',
        },
        data: {
          name: form.name,
          phone: phoneForm,
          email: emailForm,
          note: form.notes,
          postal_code: form.postCode,
          company_name: form.companyName,
          country: form.country,
          city: form.city,
          address: addressRegx,
          inquiry_details: array,
        },
      }).then((response) => {
        if (response) {
          localStorage.removeItem('cart')
          dispatch({type: 'SUBMIT_INQUIRY', payload: true})
        } else {
          dispatch({type: 'SUBMIT_INQUIRY', payload: false})
        }
      })
    } catch {
      dispatch({type: 'SUBMIT_INQUIRY', payload: false})
    }
  }
}

export const addToCart = (product) => {
  return (dispatch) => {
    let array = []
    let inquiryDetails = {}
    try {
      inquiryDetails = {
        category_id: product.categ_id,
        category_name: catJson.result.filter((res) => {
          return res.id === product.categ_id
        })[0].name,
        product_id: product.id,
        product_name: product.name,
        list_price: product.list_price,
        qty: 0,
        notes: '',
      }
      array = JSON.parse(localStorage.getItem('cart')) || []
      array.push(inquiryDetails)
      localStorage.setItem('cart', JSON.stringify(array))
      dispatch({type: 'GET_CART', payload: array})
      dispatch({type: 'ADD_TO_CART', payload: true, data: product})
    } catch {
      dispatch({type: 'ADD_TO_CART', payload: false})
    }
  }
}

export const addProp = (value, id, naming, form, phoneForm, emailForm) => {
  return (dispatch) => {
    let array = []
    const valQty = parseInt(value, 10)
    try {
      array = JSON.parse(localStorage.getItem('cart')) || []
      const index = array.findIndex((item) => item.product_id === id)

      if (naming === 'qty') {
        array[index] = Object.assign(array[index], {qty: valQty})
      } else {
        array[index] = Object.assign(array[index], {notes: value})
      }

      localStorage.setItem('cart', JSON.stringify(array))

      const newArray = JSON.parse(localStorage.getItem('cart')) || []
      const qtyValidation = newArray.filter((x) => x.qty > 0)
      const notesValidation = newArray.filter((x) => x.notes.length > 0)

      if (
        qtyValidation.length === newArray.length &&
        notesValidation.length === newArray.length &&
        form.name.length > 0 &&
        form.country.length > 0 &&
        form.city.length > 0 &&
        form.address.length > 0 &&
        emailForm.length > 0 &&
        phoneForm.length > 0
      ) {
        dispatch({type: 'ADD_TO_CART', payload: false, errorMsg: '', error: false})
      } else {
        dispatch({
          type: 'ADD_TO_CART',
          payload: false,
          errorMsg: 'Data Cant Be Minus',
          error: true,
        })
      }
    } catch {
      dispatch({type: 'ADD_TO_CART', payload: false})
    }
  }
}

export const getCart = () => {
  return (dispatch) => {
    let array = []
    try {
      array = JSON.parse(localStorage.getItem('cart')) || []
      dispatch({type: 'GET_CART', payload: array})
    } catch {
      dispatch({type: 'GET_CART', payload: false})
    }
  }
}

export const deleteCart = (id) => {
  return (dispatch) => {
    let array = []
    try {
      array = JSON.parse(localStorage.getItem('cart')) || []
      array = array.filter((el) => el.product_id !== id)
      localStorage.setItem('cart', JSON.stringify(array))
      dispatch({type: 'GET_CART', payload: array})
    } catch {
      dispatch({type: 'GET_CART', payload: false})
    }
  }
}

const cartAction = 'cart'
export default cartAction
