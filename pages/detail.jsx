import React, {useEffect} from 'react'
import Head from 'next/head'
import {connect} from 'react-redux'
import {useRouter} from 'next/router'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Chip from '@material-ui/core/Chip'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import {makeStyles, useTheme} from '@material-ui/core/styles'
import InfoIcon from '@material-ui/icons/Info'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import useFallbackImageInSSR from '../useFallbackImageInSSR'
import constant from '../constant'
import {getProductDetail, getCategoryDetail} from '../store/actions/productAction'
import {addToCart, closeCart, deleteCart} from '../store/actions/cartAction'
import Header from '../components/header'
import Body from '../components/body'
import DialogCart from '../components/dialogcart'
import Breadcrumbs from '../components/breadcrumbs'
import Footer from '../components/footer'
import css from '../public/style.css'

const useStyles = makeStyles((theme) => ({
  productImage: {
    borderRadius: 6,
    width: '85%',
  },
  btnOrange: {
    backgroundColor: '#f37125',
    color: '#ffffff',
  },
  smDownContainer: {
    padding: 0,
    margin: 0,
  },
  title: {
    fontWeight: '600',
  },
  marginBottom50: {
    marginBottom: 50,
  },
  marginBottom20: {
    marginBottom: 20,
  },
  marginBottom10: {
    marginBottom: 10,
  },
  flex: {
    display: 'flex',
  },
  alignCenter: {
    alignItems: 'center',
  },
  weight: {
    marginLeft: 10,
  },
  chip: {
    marginRight: 10,
    marginBottom: 10,
  },
  fullwidth: {
    width: '100%',
  },
  btnAdd: {
    width: 213,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}))

const Detail = ({
  getProductDetail: getProdDet,
  addToCart: addCart,
  closeCart: exitCart,
  deleteCart: delCart,
  cart,
  getCategoryDetail: getCatDet,
  product,
  notify,
  filteredCategory,
}) => {
  const {
    query: {pid, cat},
  } = useRouter()
  useEffect(() => {
    if (product === null && pid !== undefined) {
      getProdDet(pid)
      getCatDet(cat)
    } else if (product && product.id !== pid) {
      getProdDet(pid)
      getCatDet(cat)
    }
  }, [pid])
  const classes = useStyles()
  const theme = useTheme()
  const fallbackImageProps = useFallbackImageInSSR('/images/noImages.webp')
  const isTabletScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('xs'))
  const productArr = product || [{id: 1, name: 'seafood'}]
  return (
    <div>
      <Head>
        <title>{`${productArr[0].name} - Buyer Apps Aruna - Your Seafood Market`}</title>
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={productArr[0].name} />
        <meta
          name="description"
          content={`${productArr[0].name} ${productArr[0].description_sale}`}
        />
      </Head>
      <Header />
      <Container className={isTabletScreen ? classes.smDownContainer : null}>
        <Container className={isTabletScreen ? classes.smDownContainer : null}>
          <Breadcrumbs
            category={filteredCategory}
            productName={productArr[0].name}
            classProp={css.breadcrumbsDivDetail}
          />
          {isMobileScreen ? (
            <img
              src={constant.IMG_URL + productArr[0].id}
              className={`${classes.productImage} ${css.responsiveProductImage}`}
              alt={`product ${productArr[0].name}`}
              {...fallbackImageProps}
            />
          ) : null}
          <Body>
            <div>
              {product ? (
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={5}>
                    {isMobileScreen ? null : (
                      <img
                        src={constant.IMG_URL + productArr[0].id}
                        className={`${classes.productImage} ${css.responsiveProductImage}`}
                        alt={`product ${productArr[0].name}`}
                        {...fallbackImageProps}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      variant="h4"
                      className={`${classes.title} ${classes.marginBottom50}`}
                    >
                      {productArr[0].name}
                    </Typography>
                    <span
                      className={`${classes.flex} ${classes.alignCenter} ${classes.marginBottom50}`}
                    >
                      <Typography variant="h5" className={css.orange}>
                        Rp.
                        {productArr[0].list_price}
                      </Typography>
                      <Typography className={classes.weight}>/ Kg</Typography>
                    </span>
                    <Typography className={classes.marginBottom50}>
                      {productArr[0].description_sale}
                    </Typography>
                    <div className={`${classes.flex}`}>
                      <Typography
                        variant="h6"
                        className={`${classes.title} ${classes.marginBottom10}`}
                      >
                        Specification
                      </Typography>
                      <Tooltip title="Can't be clicked, only display" placement="bottom-end">
                        <InfoIcon
                          style={{marginTop: 5, marginLeft: 5}}
                          color="primary"
                          fontSize="small"
                        />
                      </Tooltip>
                    </div>
                    {productArr[0].product_template_attribute_lines.length !== 0 ? (
                      <span>
                        {productArr[0].product_template_attribute_lines.map((response) => {
                          return (
                            <Grid container spacing={2} className={classes.marginBottom20}>
                              <Grid item xs={3}>
                                <Typography
                                  variant="body1"
                                  className={`${classes.marginBottom10} ${css.widthTitleAttribute}`}
                                >
                                  {response.product_attribute.name}
                                </Typography>
                              </Grid>
                              <Grid item xs={8}>
                                {response.product_template_attribute_values.length !== 0 ? (
                                  <div>
                                    {response.product_template_attribute_values.map((resVal) => {
                                      return (
                                        <Chip
                                          variant="outlined"
                                          label={`${resVal.attribute_name}`}
                                          className={classes.chip}
                                        />
                                      )
                                    })}
                                  </div>
                                ) : null}
                              </Grid>
                            </Grid>
                          )
                        })}
                      </span>
                    ) : (
                      <Typography
                        variant="h5"
                        className={`${classes.title} ${classes.marginBottom10}`}
                      >
                        Load
                      </Typography>
                    )}
                    <div className={`${classes.flex} ${classes.fullwidth} ${css.responsiveCenter}`}>
                      {cart.some((el) => el.product_id === productArr[0].id) ? (
                        <Button
                          variant="contained"
                          className={`${classes.btnOrange} ${classes.btnAdd} ${classes.marginBottom50}`}
                          onClick={() => delCart(productArr[0].id)}
                        >
                          <Typography className={css.capitalize}>Remove From Inquiry</Typography>
                        </Button>
                      ) : (
                        <Button
                          className={`${classes.btnAdd} ${classes.marginBottom50}`}
                          color="primary"
                          variant="contained"
                          onClick={() => addCart(productArr[0])}
                        >
                          <Typography className={css.capitalize}>Add To Inquiry</Typography>
                        </Button>
                      )}
                    </div>
                  </Grid>
                  <DialogCart product={product[0]} bool={notify} closeCart={exitCart} />
                </Grid>
              ) : (
                'load'
              )}
            </div>
          </Body>
        </Container>
      </Container>
      <Footer />
    </div>
  )
}

Detail.propTypes = {
  getProductDetail: PropTypes.func.isRequired,
  getCategoryDetail: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  deleteCart: PropTypes.func.isRequired,
  closeCart: PropTypes.func.isRequired,
  cart: PropTypes.shape.isRequired,
  product: PropTypes.shape.isRequired,
  filteredCategory: PropTypes.shape.isRequired,
  notify: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  product: state.product.product_detail,
  notify: state.cart.notify,
  cart: state.cart.cart,
  filteredCategory: state.product.filteredCategory,
})

function MapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getProductDetail,
      getCategoryDetail,
      addToCart,
      deleteCart,
      closeCart,
    },
    dispatch,
  )
}

export default connect(mapStateToProps, MapDispatchToProps)(Detail)
