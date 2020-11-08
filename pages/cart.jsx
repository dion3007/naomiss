import React, {useEffect, useState, useRef} from 'react'
import Head from 'next/head'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Slide from '@material-ui/core/Slide'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {makeStyles, useTheme} from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import Container from '@material-ui/core/Container'
import constant from '../constant'
import {Link} from '../routes'
import useFallbackImageInSSR from '../useFallbackImageInSSR'
import {
  getCart,
  closeNotify,
  submitCart,
  addProp,
  deleteCart,
  setDisable,
  setDisableFalse,
} from '../store/actions/cartAction'
import Header from '../components/header'
import Body from '../components/body'
import DialogInquiry from '../components/dialoginquiry'
import DialogDelete from '../components/dialogdelete'
import css from '../public/style.css'
import Footer from '../components/footer'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '8%',
    [theme.breakpoints.down('sm')]: {
      marginTop: '16%',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '20%',
    },
  },
  fixedPosition: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    left: 0,
    padding: 20,
    zIndex: 15,
    backgroundColor: '#ffffff',
  },
  staticPosition: {
    marginTop: 40,
    marginBottom: 50,
  },
  smDownContainer: {
    padding: 0,
    margin: 0,
  },
  title: {
    fontWeight: '600',
  },
  marginBottom20: {
    marginBottom: 20,
  },
  marginTop20: {
    marginTop: 20,
  },
  marginBottom10: {
    marginBottom: 10,
  },
  marginLeftTitle: {
    marginLeft: 10,
  },
  blue: {
    color: '#008CE6',
    fontWeight: '800',
  },
  paddingBox: {
    padding: 10,
  },
  widthDesc: {
    width: '80%',
  },
  descPrice: {
    marginTop: '8%',
    alignSelf: 'center',
  },
  weight: {
    marginLeft: 10,
  },
  marginTopPerButtonThird: {
    marginTop: '5%',
  },
  center: {
    textAlign: 'center',
    alignItems: 'center',
  },
  btnColor: {
    background: '#F37125',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  heightIcon: {
    height: '10%',
  },
  flex: {
    display: 'flex',
  },
  btnBlueOutline: {
    border: '2px solid #008CE6',
    borderRadius: 10,
  },
}))

function ScrollTop(props) {
  const {children, window} = props
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  })

  return (
    <Slide direction="up" in={trigger}>
      {children}
    </Slide>
  )
}

function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

function getUnique(arr, index) {
  const unique = arr
    .map((e) => e[index])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter((e) => arr[e])
    .map((e) => arr[e])
  return unique
}

function TabPanel(props) {
  const {children, value, index, ...other} = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Typography>{children}</Typography>}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.shape.isRequired,
  value: PropTypes.string.isRequired,
}

const Cart = ({
  getCart: getSomeCart,
  submitCart: submitCartBtn,
  addProp: addPropCart,
  closeNotify: exitInquiry,
  deleteCart: delThisCart,
  setDisable: setButDisable,
  setDisableFalse: setButDisableFalse,
  cart,
  boolnotify,
  errorBool,
}) => {
  const prevCart = usePrevious(cart)
  useEffect(() => {
    if (prevCart !== cart) {
      getSomeCart()
    }
  }, [])
  const carts = cart !== null && cart !== undefined ? cart : []
  const cartData = getUnique(carts, 'product_id')
  const classes = useStyles()
  const theme = useTheme()
  const isTabletScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('xs'))
  const fallbackImageProps = useFallbackImageInSSR('/images/noImages.webp')
  const state = {
    name: '',
    companyName: '',
    country: '',
    city: '',
    postCode: '',
    notes: '',
    address: '',
  }
  const [form, setState] = useState(state)
  const [emailForm, setEmail] = useState('')
  const [phoneForm, setPhone] = useState('')
  const [errorMsg, setErrorMsg] = useState(state)
  const [error, setError] = useState({
    name: false,
    phone: false,
    email: false,
    companyName: false,
    country: false,
    city: false,
    address: false,
  })

  const validateEmail = (email) => {
    const re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g
    setEmail(email)
    return re.test(email)
  }

  const validatePhone = (phone) => {
    const re = /^[0-9\b]+$/
    setPhone(phone)
    return re.test(phone)
  }

  const getArrayValidation = cartData || {product_id: 1, qty: 0, notes: ''}
  const cartLength = getArrayValidation.length
  const qtyValidation = getArrayValidation.filter((x) => x.qty > 0)
  const notesValidation = getArrayValidation.filter((x) => x.notes.length > 0)

  const [nextButtonDisabled, setValueDisabled] = useState(true)

  useEffect(() => {
    if (qtyValidation.length === cartLength && notesValidation.length === cartLength) {
      setValueDisabled(false)
    }
  }, [])

  useEffect(() => {
    if (
      form.name === '' &&
      emailForm === '' &&
      phoneForm === '' &&
      form.country === '' &&
      form.city === '' &&
      form.address === ''
    ) {
      setButDisable()
    }
  }, [])

  const updatePhone = (e) => {
    validatePhone(e.target.value)
    getSomeCart()
    if (!validatePhone(e.target.value)) {
      setError({
        ...error,
        phone: true,
      })
      setErrorMsg({
        ...errorMsg,
        phone: 'phone is not valid',
      })
      setButDisable()
    } else if (
      qtyValidation.length === cartLength &&
      notesValidation.length === cartLength &&
      form.name !== '' &&
      emailForm !== '' &&
      phoneForm !== '' &&
      form.country !== '' &&
      form.city !== '' &&
      form.address !== '' &&
      validateEmail(emailForm)
    ) {
      setError({
        ...error,
        phone: false,
      })
      setErrorMsg({
        ...errorMsg,
        phone: '',
      })
      setButDisableFalse()
    } else {
      setError({
        ...error,
        phone: false,
      })
      setErrorMsg({
        ...errorMsg,
        phone: '',
      })
    }
  }

  const updateEmail = (e) => {
    validateEmail(e.target.value)
    getSomeCart()
    if (!validateEmail(e.target.value)) {
      setError({
        ...error,
        email: true,
      })
      setErrorMsg({
        ...errorMsg,
        email: 'email is not valid',
      })
      setButDisable()
    } else if (
      qtyValidation.length === cartLength &&
      notesValidation.length === cartLength &&
      form.name !== '' &&
      emailForm !== '' &&
      phoneForm !== '' &&
      form.country !== '' &&
      form.city !== '' &&
      form.address !== '' &&
      validatePhone(phoneForm)
    ) {
      setError({
        ...error,
        email: false,
      })
      setErrorMsg({
        ...errorMsg,
        email: '',
      })
      setButDisableFalse()
    } else {
      setError({
        ...error,
        email: false,
      })
      setErrorMsg({
        ...errorMsg,
        email: '',
      })
    }
  }

  const updateFieldWithoutValidation = (e) => {
    setState({
      ...form,
      [e.target.name]: e.target.value,
    })
    if (form.postCode < 0) {
      setError({
        ...error,
        postCode: true,
      })
      setErrorMsg({
        ...errorMsg,
        postCode: 'fill by valid numbers',
      })
      setButDisable()
    } else if (
      form.postCode > 0 &&
      qtyValidation.length === cartLength &&
      notesValidation.length === cartLength &&
      e.target.value !== '' &&
      form.postCode > 0 &&
      form.name !== '' &&
      form.country !== '' &&
      form.city !== '' &&
      form.address !== '' &&
      emailForm !== '' &&
      phoneForm !== '' &&
      validateEmail(emailForm) &&
      validatePhone(phoneForm)
    ) {
      setError({
        ...error,
        [e.target.name]: false,
      })
      setErrorMsg({
        ...errorMsg,
        [e.target.name]: '',
      })
      setButDisable()
    }
  }

  const updateField = (e) => {
    getSomeCart()
    setState({
      ...form,
      [e.target.name]: e.target.value,
    })
    if (e.target.value === '') {
      setError({
        ...error,
        [e.target.name]: true,
      })
      setErrorMsg({
        ...errorMsg,
        [e.target.name]: 'required field',
      })
      setButDisable()
    } else if (
      qtyValidation.length === cartLength &&
      notesValidation.length === cartLength &&
      e.target.value !== '' &&
      form.postCode > 0 &&
      form.name !== '' &&
      form.country !== '' &&
      form.city !== '' &&
      form.address !== '' &&
      emailForm !== '' &&
      phoneForm !== '' &&
      validateEmail(emailForm) &&
      validatePhone(phoneForm)
    ) {
      setError({
        ...error,
        [e.target.name]: false,
      })
      setErrorMsg({
        ...errorMsg,
        [e.target.name]: '',
      })
      setButDisableFalse()
    } else if (form.postCode > 0) {
      setError({
        ...error,
        [e.target.name]: false,
      })
      setErrorMsg({
        ...errorMsg,
        [e.target.name]: '',
      })
    } else {
      setError({
        ...error,
        [e.target.name]: false,
      })
      setErrorMsg({
        ...errorMsg,
        [e.target.name]: '',
      })
    }
  }

  const [tab, setTab] = useState('inquiryList')
  const [deleteBool, setDelBool] = useState(false)
  const [idDeleteProduct, setIdDelete] = useState()

  const deleteWithDialog = (id) => {
    setDelBool(true)
    setIdDelete(id)
  }

  const exitDialogDelete = () => {
    setDelBool(false)
  }

  const updatePropsValidation = (value, id, mean) => {
    if (qtyValidation.length === cartLength && notesValidation.length === cartLength) {
      setValueDisabled(false)
    } else {
      setValueDisabled(true)
    }
    addPropCart(value, id, mean, form, phoneForm, emailForm)
    getSomeCart()
  }

  const handleTab = (value) => {
    setTab(value)
  }
  return (
    <div>
      <Head>
        <title>Your Inquiry - Buyer Apps Aruna - Your Seafood Market</title>
      </Head>
      <Header />
      <Container className={isTabletScreen ? classes.smDownContainer : null}>
        <Container className={isTabletScreen ? classes.smDownContainer : null}>
          <Body>
            <div className={classes.root}>
              {isMobileScreen ? (
                <>
                  {cartData !== null && cartData.length !== 0 ? (
                    <>
                      <TabPanel value={tab} index="inquiryList">
                        <Typography
                          variant="h6"
                          className={`${classes.title} ${classes.marginBottom10}`}
                        >
                          Order List
                        </Typography>
                        <span>
                          {cartData.map((res) => {
                            return (
                              <Paper className={`${css.boxProduct} ${classes.paddingBox}`}>
                                <div className={`${classes.flex} ${classes.marginBottom20}`}>
                                  <img
                                    src={constant.IMG_URL + res.product_id}
                                    alt={`product produk ${res.product_name}`}
                                    {...fallbackImageProps}
                                    width="100"
                                  />
                                  <div
                                    className={`${classes.marginLeftTitle} ${classes.widthDesc}`}
                                  >
                                    <Typography variant="h6" className={`${classes.title}`}>
                                      {res.product_name}
                                    </Typography>
                                    <div className={`${css.flex} ${classes.descPrice}`}>
                                      <Typography className={css.orange}>
                                        Rp.
                                        {res.list_price}
                                      </Typography>
                                      <Typography className={classes.weight}>/ Kg</Typography>
                                    </div>
                                  </div>
                                  <IconButton
                                    className={classes.heightIcon}
                                    onClick={() => deleteWithDialog(res.product_id)}
                                  >
                                    <DeleteIcon className={css.greyMockup} />
                                  </IconButton>
                                </div>
                                <div className={classes.marginBottom20}>
                                  <Typography
                                    className={`${classes.title} ${classes.marginBottom10}`}
                                  >
                                    Quantity
                                    <span className={css.redRequired}>*</span>
                                  </Typography>
                                  <div className={`${css.flex} ${css.alignItemsCenter}`}>
                                    <TextField
                                      id="outlined-qty"
                                      type="number"
                                      placeholder={res.qty || '1'}
                                      name="qty"
                                      defaultValue={res.qty}
                                      onChange={
                                        (e) =>
                                          updatePropsValidation(
                                            e.target.value,
                                            res.product_id,
                                            'qty',
                                          ) // eslint-disable-next-line react/jsx-curly-newline
                                      }
                                      oneKeyUp={
                                        (e) =>
                                          updatePropsValidation(
                                            e.target.value,
                                            res.product_id,
                                            'qty',
                                          ) // eslint-disable-next-line react/jsx-curly-newline
                                      }
                                      variant="outlined"
                                      inputProps={{min: 1, max: '10', step: '1'}}
                                    />
                                    <Typography className={classes.weight}> Kg</Typography>
                                  </div>
                                </div>
                                <div>
                                  <Typography
                                    className={`${classes.title} ${classes.marginBottom10}`}
                                  >
                                    Specification
                                    <span className={css.redRequired}>*</span>
                                  </Typography>
                                  <TextField
                                    id="outlined-detail"
                                    variant="outlined"
                                    fullWidth
                                    name={`notes-${res.product_id}`}
                                    defaultValue={res.notes}
                                    placeholder={
                                      res.notes ||
                                      'Enter product details such as color, size, materials etc. and other specification requirements to receive an accurate quote.'
                                    }
                                    onChange={
                                      (e) =>
                                        updatePropsValidation(
                                          e.target.value,
                                          res.product_id,
                                          'notes',
                                        ) // eslint-disable-next-line react/jsx-curly-newline
                                    }
                                    onKeyUp={
                                      (e) =>
                                        updatePropsValidation(
                                          e.target.value,
                                          res.product_id,
                                          'notes',
                                        ) // eslint-disable-next-line react/jsx-curly-newline
                                    }
                                    multiline
                                    rows={2}
                                  />
                                </div>
                              </Paper>
                            )
                          })}
                        </span>
                        <ScrollTop>
                          <div className={`${classes.center} ${classes.fixedPosition}`}>
                            <Button
                              className={`${classes.btnColor} ${classes.marginTopPerButtonThird}`}
                              variant="contained"
                              color="primary"
                              disabled={nextButtonDisabled}
                              onClick={() => handleTab('inquiryForm')}
                            >
                              <Typography className={css.capitalize}>Checkout</Typography>
                            </Button>
                            <Link route="/" href>
                              <Button
                                className={`${classes.marginTopPerButtonThird}`}
                                color="primary"
                              >
                                <Typography className={css.capitalize}>
                                  Browse More Product
                                </Typography>
                              </Button>
                            </Link>
                          </div>
                        </ScrollTop>
                        <div className={`${classes.center} ${classes.staticPosition}`}>
                          <Button
                            className={`${classes.btnColor} ${classes.marginTopPerButtonThird}`}
                            variant="contained"
                            color="primary"
                            disabled={nextButtonDisabled}
                            onClick={() => handleTab('inquiryForm')}
                          >
                            <Typography className={css.capitalize}>Checkout</Typography>
                          </Button>
                          <Link route="/" href>
                            <Button
                              className={`${classes.marginTopPerButtonThird}`}
                              color="primary"
                            >
                              <Typography className={css.capitalize}>
                                Browse More Product
                              </Typography>
                            </Button>
                          </Link>
                        </div>
                      </TabPanel>

                      <TabPanel value={tab} index="inquiryForm">
                        <Typography
                          variant="h6"
                          className={`${classes.title} ${classes.marginBottom10}`}
                        >
                          Contact Information
                        </Typography>
                        <div className={classes.marginBottom20}>
                          <Typography
                            variant="h6"
                            className={`${classes.title} ${classes.marginBottom10}`}
                          >
                            Full Name
                            <span className={css.redRequired}>*</span>
                          </Typography>
                          <TextField
                            error={error.name}
                            id="outlined-name"
                            placeholder="Full Name"
                            name="name"
                            value={form.name}
                            helperText={errorMsg.name}
                            onChange={updateField}
                            onKeyUp={updateField}
                            variant="outlined"
                            className={css.formWidthCartResponsive}
                          />
                        </div>
                        <div className={classes.marginBottom20}>
                          <Typography
                            variant="h6"
                            className={`${classes.title} ${classes.marginBottom10}`}
                          >
                            Phone Number
                            <span className={css.redRequired}>*</span>
                          </Typography>
                          <TextField
                            error={error.phone}
                            id="outlined-phone"
                            placeholder="081283882723"
                            name="phone"
                            type="number"
                            value={phoneForm}
                            helperText={errorMsg.phone}
                            onChange={updatePhone}
                            onKeyUp={updatePhone}
                            variant="outlined"
                            className={css.formWidthCartResponsive}
                          />
                        </div>
                        <div className={classes.marginBottom20}>
                          <Typography
                            variant="h6"
                            className={`${classes.title} ${classes.marginBottom10}`}
                          >
                            Email
                            <span className={css.redRequired}>*</span>
                          </Typography>
                          <TextField
                            error={error.email}
                            id="outlined-email"
                            placeholder="buyer@aruna.id"
                            name="email"
                            value={emailForm}
                            helperText={errorMsg.email}
                            onChange={updateEmail}
                            variant="outlined"
                            className={css.formWidthCartResponsive}
                          />
                        </div>
                        <div className={classes.marginBottom20}>
                          <Typography
                            variant="h6"
                            className={`${classes.title} ${classes.marginBottom10}`}
                          >
                            Company Name
                          </Typography>
                          <TextField
                            error={error.companyName}
                            id="outlined-company"
                            placeholder="Officename/Bussinesname"
                            name="companyName"
                            value={form.companyName}
                            helperText={errorMsg.companyName}
                            onChange={updateFieldWithoutValidation}
                            onKeyUp={updateFieldWithoutValidation}
                            variant="outlined"
                            className={css.formWidthCartResponsive}
                          />
                        </div>
                        <div className={classes.marginBottom20}>
                          <Typography
                            variant="h6"
                            className={`${classes.title} ${classes.marginBottom10}`}
                          >
                            Country
                            <span className={css.redRequired}>*</span>
                          </Typography>
                          <TextField
                            error={error.country}
                            id="outlined-country"
                            placeholder="Country"
                            name="country"
                            value={form.country}
                            helperText={errorMsg.country}
                            onChange={updateField}
                            onKeyUp={updateField}
                            variant="outlined"
                            className={css.formWidthCartResponsive}
                          />
                        </div>
                        <Grid container spacing={1} className={css.formWidthCartResponsive}>
                          <Grid item md={5} xs={12} className={`${classes.marginBottom20}`}>
                            <Typography
                              variant="h6"
                              className={`${classes.title} ${classes.marginBottom10}`}
                            >
                              City
                              <span className={css.redRequired}>*</span>
                            </Typography>
                            <TextField
                              error={error.city}
                              id="outlined-city"
                              placeholder="City"
                              name="city"
                              value={form.city}
                              helperText={errorMsg.city}
                              onChange={updateField}
                              onKeyUp={updateField}
                              variant="outlined"
                              fullWidth
                            />
                          </Grid>
                          <Grid item md={4} xs={12} className={`${classes.marginBottom20}`}>
                            <Typography
                              variant="h6"
                              className={`${classes.title} ${classes.marginBottom10}`}
                            >
                              Postal Code
                            </Typography>
                            <TextField
                              error={error.postCode}
                              id="outlined-postCode"
                              placeholder="000000"
                              type="number"
                              name="postCode"
                              value={form.postCode}
                              helperText={errorMsg.postCode}
                              onChange={updateFieldWithoutValidation}
                              onKeyUp={updateFieldWithoutValidation}
                              variant="outlined"
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                        <div className={classes.marginBottom20}>
                          <Typography
                            variant="h6"
                            className={`${classes.title} ${classes.marginBottom10}`}
                          >
                            Address
                            <span className={css.redRequired}>*</span>
                          </Typography>
                          <TextField
                            error={error.address}
                            id="outlined-address"
                            placeholder="Full Address"
                            name="address"
                            value={form.address}
                            helperText={errorMsg.address}
                            onChange={updateField}
                            onKeyUp={updateField}
                            variant="outlined"
                            className={css.formWidthCartResponsive}
                            multiline
                            rows={4}
                          />
                        </div>
                        <div className={`${classes.marginBottom20} ${classes.marginTop20}`}>
                          <Typography
                            variant="h6"
                            className={`${classes.title} ${classes.marginBottom10}`}
                          >
                            Add Note
                          </Typography>
                          <TextField
                            id="outlined-notes"
                            placeholder="You can add notes for products that are not in our catalog"
                            name="notes"
                            value={form.notes}
                            onChange={updateFieldWithoutValidation}
                            onKeyUp={updateFieldWithoutValidation}
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                          />
                        </div>
                        <ScrollTop>
                          <div className={`${classes.center} ${classes.fixedPosition}`}>
                            <Button
                              className={`${classes.btnColor} ${classes.marginTopPerButtonThird}`}
                              variant="contained"
                              color="primary"
                              disabled={errorBool === undefined ? true : errorBool}
                              onClick={() => submitCartBtn(form, emailForm, phoneForm)}
                            >
                              <Typography className={css.capitalize}>Submit Product</Typography>
                            </Button>
                            <Button
                              className={`${classes.marginTopPerButtonThird}`}
                              color="primary"
                              onClick={() => handleTab('inquiryList')}
                            >
                              <Typography className={css.capitalize}>Back To Cart</Typography>
                            </Button>
                          </div>
                        </ScrollTop>
                        <div className={`${classes.center} ${classes.staticPosition}`}>
                          <Button
                            className={`${classes.btnColor} ${classes.marginTopPerButtonThird}`}
                            variant="contained"
                            color="primary"
                            disabled={errorBool === undefined ? true : errorBool}
                            onClick={() => submitCartBtn(form, emailForm, phoneForm)}
                          >
                            <Typography className={css.capitalize}>Submit Product</Typography>
                          </Button>
                          <Button
                            className={`${classes.marginTopPerButtonThird}`}
                            color="primary"
                            onClick={() => handleTab('inquiryList')}
                          >
                            <Typography className={css.capitalize}>Back To Cart</Typography>
                          </Button>
                        </div>
                      </TabPanel>
                    </>
                  ) : (
                    <div style={{textAlign: 'center', marginTop: '60%'}}>
                      <img
                        src="/images/noCart.webp"
                        alt="no Product in this Cart"
                        width="260"
                        className={`${classes.marginBottom10}`}
                      />
                      <Typography
                        className={`${classes.marginBottom20}`}
                        style={{textAlign: 'center'}}
                      >
                        Your order list is still empty....
                      </Typography>
                      <div>
                        <Link route="/" href>
                          <Button
                            variant="outlined"
                            fullWidth
                            size="large"
                            className={`${classes.btnBlueOutline} ${classes.marginBottom20}`}
                          >
                            <Typography className={`${classes.blue} ${css.capitalize}`}>
                              Browse our product categories
                            </Typography>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <Typography variant="h5" className={`${classes.title} ${classes.marginBottom10}`}>
                    Inquiry Form
                  </Typography>
                  <Typography className={`${classes.marginBottom20}`}>
                    Complete the data below to order the desired product.
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <div className={classes.marginBottom20}>
                        <Typography
                          variant="h6"
                          className={`${classes.title} ${classes.marginBottom10}`}
                        >
                          Full Name
                          <span className={css.redRequired}>*</span>
                        </Typography>
                        <TextField
                          error={error.name}
                          id="outlined-name"
                          placeholder="Full Name"
                          name="name"
                          value={form.name}
                          helperText={errorMsg.name}
                          onChange={updateField}
                          onKeyUp={updateField}
                          variant="outlined"
                          className={css.formWidthCartResponsive}
                        />
                      </div>
                      <div className={classes.marginBottom20}>
                        <Typography
                          variant="h6"
                          className={`${classes.title} ${classes.marginBottom10}`}
                        >
                          Phone Number
                          <span className={css.redRequired}>*</span>
                        </Typography>
                        <TextField
                          error={error.phone}
                          id="outlined-phone"
                          placeholder="081283882723"
                          name="phone"
                          type="number"
                          value={phoneForm}
                          helperText={errorMsg.phone}
                          onChange={updatePhone}
                          onKeyUp={updatePhone}
                          variant="outlined"
                          className={css.formWidthCartResponsive}
                        />
                      </div>
                      <div className={classes.marginBottom20}>
                        <Typography
                          variant="h6"
                          className={`${classes.title} ${classes.marginBottom10}`}
                        >
                          Email
                          <span className={css.redRequired}>*</span>
                        </Typography>
                        <TextField
                          error={error.email}
                          id="outlined-email"
                          placeholder="buyer@aruna.id"
                          name="email"
                          value={emailForm}
                          helperText={errorMsg.email}
                          onChange={updateEmail}
                          variant="outlined"
                          className={css.formWidthCartResponsive}
                        />
                      </div>
                      <div className={classes.marginBottom20}>
                        <Typography
                          variant="h6"
                          className={`${classes.title} ${classes.marginBottom10}`}
                        >
                          Company Name
                        </Typography>
                        <TextField
                          error={error.companyName}
                          id="outlined-company"
                          placeholder="Officename/Bussinesname"
                          name="companyName"
                          value={form.companyName}
                          helperText={errorMsg.companyName}
                          onChange={updateFieldWithoutValidation}
                          onKeyUp={updateFieldWithoutValidation}
                          variant="outlined"
                          className={css.formWidthCartResponsive}
                        />
                      </div>
                      <div className={classes.marginBottom20}>
                        <Typography
                          variant="h6"
                          className={`${classes.title} ${classes.marginBottom10}`}
                        >
                          Country
                          <span className={css.redRequired}>*</span>
                        </Typography>
                        <TextField
                          error={error.country}
                          id="outlined-country"
                          placeholder="Country"
                          name="country"
                          value={form.country}
                          helperText={errorMsg.country}
                          onChange={updateField}
                          onKeyUp={updateField}
                          variant="outlined"
                          className={css.formWidthCartResponsive}
                        />
                      </div>
                      <Grid container spacing={1} className={css.formWidthCartResponsive}>
                        <Grid item md={5} xs={12} className={`${classes.marginBottom20}`}>
                          <Typography
                            variant="h6"
                            className={`${classes.title} ${classes.marginBottom10}`}
                          >
                            City
                            <span className={css.redRequired}>*</span>
                          </Typography>
                          <TextField
                            error={error.city}
                            id="outlined-city"
                            placeholder="City"
                            name="city"
                            value={form.city}
                            helperText={errorMsg.city}
                            onChange={updateField}
                            onKeyUp={updateField}
                            variant="outlined"
                            fullWidth
                          />
                        </Grid>
                        <Grid item md={4} xs={12} className={`${classes.marginBottom20}`}>
                          <Typography
                            variant="h6"
                            className={`${classes.title} ${classes.marginBottom10}`}
                          >
                            Postal Code
                          </Typography>
                          <TextField
                            error={error.postCode}
                            id="outlined-postCode"
                            placeholder="000000"
                            type="number"
                            name="postCode"
                            value={form.postCode}
                            helperText={errorMsg.postCode}
                            onChange={updateFieldWithoutValidation}
                            onKeyUp={updateFieldWithoutValidation}
                            variant="outlined"
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                      <div className={classes.marginBottom20}>
                        <Typography
                          variant="h6"
                          className={`${classes.title} ${classes.marginBottom10}`}
                        >
                          Address
                          <span className={css.redRequired}>*</span>
                        </Typography>
                        <TextField
                          error={error.address}
                          id="outlined-address"
                          placeholder="Full Address"
                          name="address"
                          value={form.address}
                          helperText={errorMsg.address}
                          onChange={updateField}
                          onKeyUp={updateField}
                          variant="outlined"
                          className={css.formWidthCartResponsive}
                          multiline
                          rows={4}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography
                        variant="h6"
                        className={`${classes.title} ${classes.marginBottom20}`}
                      >
                        Order List
                      </Typography>
                      {cartData !== null && cartData.length !== 0 ? (
                        <span>
                          {cartData.map((res) => {
                            return (
                              <Paper className={`${css.boxProduct} ${classes.paddingBox}`}>
                                <div className={`${classes.flex} ${classes.marginBottom20}`}>
                                  <img
                                    src={constant.IMG_URL + res.product_id}
                                    alt={`product produk ${res.product_name}`}
                                    {...fallbackImageProps}
                                    width="100"
                                  />
                                  <div
                                    className={`${classes.marginLeftTitle} ${classes.widthDesc}`}
                                  >
                                    <Typography variant="h6" className={`${classes.title}`}>
                                      {res.product_name}
                                    </Typography>
                                    <div className={`${css.flex} ${classes.descPrice}`}>
                                      <Typography className={css.orange}>
                                        Rp.
                                        {res.list_price}
                                      </Typography>
                                      <Typography className={classes.weight}>/ Kg</Typography>
                                    </div>
                                  </div>
                                  <IconButton
                                    className={classes.heightIcon}
                                    onClick={() => deleteWithDialog(res.product_id)}
                                  >
                                    <DeleteIcon className={css.greyMockup} />
                                  </IconButton>
                                </div>
                                <div className={classes.marginBottom20}>
                                  <Typography
                                    className={`${classes.title} ${classes.marginBottom10}`}
                                  >
                                    Quantity
                                    <span className={css.redRequired}>*</span>
                                  </Typography>
                                  <div className={`${css.flex} ${css.alignItemsCenter}`}>
                                    <TextField
                                      id="outlined-qty"
                                      type="number"
                                      placeholder={res.qty || '1'}
                                      name="qty"
                                      onChange={
                                        (e) =>
                                          updatePropsValidation(
                                            e.target.value,
                                            res.product_id,
                                            'qty',
                                          ) // eslint-disable-next-line react/jsx-curly-newline
                                      }
                                      oneKeyUp={
                                        (e) =>
                                          updatePropsValidation(
                                            e.target.value,
                                            res.product_id,
                                            'qty',
                                          ) // eslint-disable-next-line react/jsx-curly-newline
                                      }
                                      variant="outlined"
                                      inputProps={{min: 1, max: '10', step: '1'}}
                                    />
                                    <Typography className={classes.weight}> Kg</Typography>
                                  </div>
                                </div>
                                <div>
                                  <Typography
                                    className={`${classes.title} ${classes.marginBottom10}`}
                                  >
                                    Specification
                                    <span className={css.redRequired}>*</span>
                                  </Typography>
                                  <TextField
                                    id="outlined-detail"
                                    variant="outlined"
                                    fullWidth
                                    name={`notes-${res.product_id}`}
                                    placeholder={
                                      res.notes ||
                                      'Enter product details such as color, size, materials etc. and other specification requirements to receive an accurate quote.'
                                    }
                                    onChange={
                                      (e) =>
                                        updatePropsValidation(
                                          e.target.value,
                                          res.product_id,
                                          'notes',
                                        ) // eslint-disable-next-line react/jsx-curly-newline
                                    }
                                    onKeyUp={
                                      (e) =>
                                        updatePropsValidation(
                                          e.target.value,
                                          res.product_id,
                                          'notes',
                                        ) // eslint-disable-next-line react/jsx-curly-newline
                                    }
                                    multiline
                                    rows={3}
                                  />
                                </div>
                              </Paper>
                            )
                          })}
                          <div className={`${classes.marginBottom20} ${classes.marginTop20}`}>
                            <Typography
                              variant="h6"
                              className={`${classes.title} ${classes.marginBottom10}`}
                            >
                              Add Note
                            </Typography>
                            <TextField
                              id="outlined-notes"
                              placeholder="You can add notes for products that are not in our catalog"
                              name="notes"
                              value={form.notes}
                              onChange={updateFieldWithoutValidation}
                              onKeyUp={updateFieldWithoutValidation}
                              variant="outlined"
                              fullWidth
                              multiline
                              rows={4}
                            />
                          </div>
                          <div className={`${classes.center}`}>
                            <Button
                              className={`${classes.btnColor} ${classes.marginTopPerButtonThird}`}
                              variant="contained"
                              color="primary"
                              disabled={errorBool === undefined ? true : errorBool}
                              onClick={() => submitCartBtn(form, emailForm, phoneForm)}
                            >
                              <Typography className={css.capitalize}>Submit Product</Typography>
                            </Button>
                          </div>
                        </span>
                      ) : (
                        <span>
                          <Typography className={`${classes.marginBottom20}`}>
                            Your order list is still empty....
                          </Typography>
                          <Link route="/" href>
                            <Button variant="outlined" className={classes.btnBlueOutline}>
                              <Typography className={`${classes.blue} ${css.capitalize}`}>
                                Browse our product categories
                              </Typography>
                            </Button>
                          </Link>
                        </span>
                      )}
                    </Grid>
                  </Grid>
                </>
              )}

              <DialogInquiry
                text="Inquiry has been sent successfully to"
                email={emailForm}
                bool={boolnotify}
                closeCart={exitInquiry}
              />
              <DialogDelete
                bool={deleteBool}
                closeCart={exitDialogDelete}
                deleteFunction={() => delThisCart(idDeleteProduct)}
              />
            </div>
          </Body>
        </Container>
      </Container>
      {!isMobileScreen && <Footer />}
    </div>
  )
}

Cart.propTypes = {
  getCart: PropTypes.func.isRequired,
  submitCart: PropTypes.func.isRequired,
  closeNotify: PropTypes.func.isRequired,
  addProp: PropTypes.func.isRequired,
  deleteCart: PropTypes.func.isRequired,
  setDisable: PropTypes.func.isRequired,
  setDisableFalse: PropTypes.func.isRequired,
  cart: PropTypes.shape.isRequired,
  boolnotify: PropTypes.string.isRequired,
  errorBool: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  errorBool: state.cart.error,
  boolnotify: state.cart.notifyEmail,
})

function MapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getCart,
      submitCart,
      addProp,
      closeNotify,
      deleteCart,
      setDisable,
      setDisableFalse,
    },
    dispatch,
  )
}

export default connect(mapStateToProps, MapDispatchToProps)(Cart)
