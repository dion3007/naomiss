import React, {useEffect} from 'react'
import Head from 'next/head'
import {connect} from 'react-redux'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Container from '@material-ui/core/Container'
import {makeStyles, useTheme} from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {Typography, Paper} from '@material-ui/core'
import {useRouter} from 'next/router'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Pagination from '@material-ui/lab/Pagination'
import Skeleton from '@material-ui/lab/Skeleton'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import Hidden from '@material-ui/core/Hidden'
import {StickyContainer, Sticky} from 'react-sticky'
import constant from '../constant'
import {addToCart, closeCart, getCart, deleteCart} from '../store/actions/cartAction'
import {Link} from '../routes'
import {
  getProduct,
  getCategoryDetail,
  getProductSorted,
  setProductNull,
} from '../store/actions/productAction'
import Header from '../components/header'
import Banner from '../components/banner'
import Footer from '../components/footer'
import Body from '../components/body'
import DialogCart from '../components/dialogcart'
import useFallbackImageInSSR from '../useFallbackImageInSSR'
import css from '../public/style.css'

const useStyles = makeStyles((theme) => ({
  paddingLi: {
    paddingLeft: 0,
  },
  flex: {
    display: 'flex',
  },
  content: {
    alignItems: 'center',
  },
  smDownContainer: {
    padding: 0,
    margin: 0,
  },
  center: {
    textAlign: 'center',
    alignItems: 'center',
  },
  marginForm: {
    marginRight: '3%',
  },
  marginBottomForm: {
    marginBottom: '3%',
  },
  alignCenter: {
    alignItems: 'center',
  },
  attribStyle: {
    width: '50%',
  },
  marginTopPerButtonThird: {
    marginTop: '5%',
  },
  btnOrange: {
    backgroundColor: '#f37125',
    color: '#ffffff',
  },
  activeLink: {
    color: '#007BFF',
    fontWeight: 600,
  },
  imgSize: {
    width: '100%',
    borderRadius: 5,
  },
  chip: {
    marginRight: 10,
  },
  chipActive: {
    marginRight: 10,
    color: '#ffffff',
    backgroundColor: '#008CE6',
    borderColor: '#008CE6',
  },
  slider: {
    overflowY: 'auto',
  },
  heightAccordion: {
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      height: 0,
    },
  },
  allFontWeight: {
    fontWeight: 600,
  },
  xsFontSize: {
    [theme.breakpoints.down('xs')]: {
      xsFontSize: 14,
    },
  },
}))

const Product = ({
  getProduct: getProductDatas,
  addToCart: addCart,
  getCart: getSomeCart,
  closeCart: exitCart,
  getCategoryDetail: getCat,
  deleteCart: delCart,
  getProductSorted: productSorted,
  setProductNull: setNullProduct,
  notify,
  data,
  cart,
  category,
  product,
  pageCount,
  productLength,
  filteredCategory,
}) => {
  const {
    query: {id},
  } = useRouter()
  useEffect(() => {
    if ((product === null && id !== undefined) || (product !== null && product.categ_id !== id)) {
      getProductDatas(id, 0, 10)
      getCat(id)
      getSomeCart()
    }
  }, [id])
  const categoryFilter = category.result.filter((res) => {
    return res.flag === true
  })
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState('panelCategory')
  const [page, setPage] = React.useState(1)
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }
  const [filter, setFilter] = React.useState('')
  const handleChangeSelect = (event) => {
    setFilter(event.target.value)
    productSorted(id, event.target.value, 0, 10)
    setPage(1)
  }
  const emptyFilter = () => {
    setFilter('')
    setNullProduct()
  }
  const handleChangePagination = (event, value) => {
    const multiple = value * 10 - 10
    const pages = value * 10
    setPage(value)
    productSorted(id, filter, multiple, pages)
  }
  const fallbackImageProps = useFallbackImageInSSR('/images/noImages.webp')

  const bannerImg = () => {
    switch (id) {
      case '10':
        return '/banner/cumicumi.webp'
      case '11':
        return '/banner/gurita.webp'
      case '5':
        return '/banner/ikandasar.webp'
      case '7':
        return '/banner/pelagis.webp'
      case '4':
        return '/banner/kepiting.webp'
      case '9':
        return '/banner/kepiting.webp'
      case '6':
        return '/banner/lobster.webp'
      case '8':
        return '/banner/udang.webp'
      default:
        return '/banner/banner2.webp'
    }
  }

  const theme = useTheme()
  const isTabletScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const isMobilecreen = useMediaQuery(theme.breakpoints.down('xs'))
  return (
    <div>
      <Head>
        <title>
          {filteredCategory
            ? `${filteredCategory[0].name} Category  - Buyer Apps
          Aruna - Your Seafood Market`
            : 'All Category'}
        </title>
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content={categoryFilter.map((res) => {
            return res.name
          })}
        />
        <meta
          name="description"
          content={categoryFilter.map((res) => {
            return res.name
          })}
        />
      </Head>
      <Header />
      <Container className={isTabletScreen ? classes.smDownContainer : null}>
        <Banner
          banner={bannerImg()}
          title={filteredCategory ? `${filteredCategory[0].name} Category` : 'All Category'}
          filteredCategory={filteredCategory}
        />
        <Container className={isTabletScreen ? classes.smDownContainer : null}>
          <StickyContainer>
            <Body>
              {isTabletScreen ? (
                <Sticky>
                  {({style, isSticky}) => (
                    <div
                      className={`${classes.slider} ${css.scrollHide}`}
                      style={
                        isSticky
                          ? {
                              ...style,
                              top: 15,
                              zIndex: 10,
                              paddingTop: 30,
                              paddingBottom: 20,
                              width: '100%',
                            }
                          : style
                      }
                    >
                      {categoryFilter &&
                        categoryFilter.map((res) => {
                          return (
                            <Link route="product" params={{id: res.id}} href>
                              <Chip
                                onClick={emptyFilter}
                                label={`${res.name}`}
                                className={
                                  res.id === parseFloat(id)
                                    ? `${classes.chipActive} ${css.chip}`
                                    : `${classes.chip} ${css.chip}`
                                }
                                variant="outlined"
                              />
                            </Link>
                          )
                        })}
                    </div>
                  )}
                </Sticky>
              ) : null}
              <Grid container spacing={3}>
                <Hidden smDown>
                  <Grid item md={3}>
                    <StickyContainer className={classes.heightAccordion}>
                      <Sticky>
                        {({style, isSticky}) => (
                          <Accordion
                            style={isSticky ? {...style, top: 70, zIndex: 5} : style}
                            square
                            expanded={expanded === 'panelCategory'}
                            onChange={handleChange('panelCategory')}
                          >
                            <AccordionSummary
                              aria-controls="category"
                              expandIcon={<ExpandMoreIcon />}
                              id="panel3d-header"
                            >
                              <Typography>Category</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <List component="nav" aria-label="sidelistcategory">
                                {categoryFilter &&
                                  categoryFilter.map((res) => {
                                    return (
                                      <Link route="product" params={{id: res.id}} href>
                                        <ListItem
                                          onClick={emptyFilter}
                                          className={`${classes.paddingLi} ${css.clickAble}`}
                                        >
                                          {res.id === parseFloat(id) ? (
                                            <ListItemText
                                              className={classes.activeLink}
                                              primary={<span>{res.name}</span>}
                                            />
                                          ) : (
                                            <ListItemText primary={res.name} />
                                          )}
                                        </ListItem>
                                      </Link>
                                    )
                                  })}
                              </List>
                            </AccordionDetails>
                          </Accordion>
                        )}
                      </Sticky>
                    </StickyContainer>
                  </Grid>
                </Hidden>
                <Grid item md={9} sm={12} xs={12}>
                  <div className={css.marginTopBottom16}>
                    <Grid container justify="space-between" className={classes.content}>
                      <Grid item xs={5}>
                        {product === null ? (
                          <Skeleton variant="text" width={150} height={40} />
                        ) : (
                          <Typography variant="h6" style={{color: '#969696'}}>
                            {productLength}
                            {` `}
                            Items Found
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={5}>
                        {product === null ? (
                          <Skeleton variant="text" height={50} />
                        ) : (
                          <FormControl
                            variant="outlined"
                            size="small"
                            className={classes.marginForm}
                            fullWidth
                          >
                            <InputLabel id="demo-simple-select-outlined-label">SORT</InputLabel>
                            <Select
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              value={filter}
                              onChange={handleChangeSelect}
                              label="Text"
                            >
                              <MenuItem value="aZ">Sort A to Z</MenuItem>
                              <MenuItem value="zA">Sort Z to A</MenuItem>
                              <MenuItem value="low">Sort by lower Price</MenuItem>
                              <MenuItem value="hi">Sort by Higher Price</MenuItem>
                            </Select>
                          </FormControl>
                        )}
                      </Grid>
                    </Grid>
                    <div>
                      {product &&
                        product.map((res) => {
                          return (
                            <Paper className={css.boxProduct} key={res.id}>
                              <Grid container spacing={0}>
                                <Grid md={2} sm={3} xs={3}>
                                  <img
                                    src={constant.IMG_URL + res.id}
                                    alt={`product ${res.name}`}
                                    {...fallbackImageProps}
                                    className={`${classes.imgSize} ${css.responsiveList}`}
                                  />
                                </Grid>
                                <Grid md={10} sm={9} xs={9}>
                                  <Container className={classes.marginBottomForm}>
                                    <Typography
                                      className={`${classes.xsFontSize} ${classes.allFontWeight} ${classes.marginBottomForm}`}
                                    >
                                      {res.name}
                                    </Typography>
                                    <div className={`${classes.marginBottomForm} ${css.flex}`}>
                                      <Typography
                                        className={`${classes.xsFontSize} ${classes.allFontWeight} ${css.orange}`}
                                      >
                                        Rp
                                        {res.list_price}
                                      </Typography>
                                      <Typography
                                        style={{
                                          color: '#969696',
                                          marginLeft: 5,
                                          alignSelf: 'center',
                                        }}
                                      >
                                        / Kg
                                      </Typography>
                                    </div>
                                    {res.product_template_attribute_lines.length !== 0 ? (
                                      <span>
                                        {res.product_template_attribute_lines.map((resVar) => {
                                          return (
                                            <Grid container className={`${classes.alignCenter}`}>
                                              <Grid item xs={6} sm={4}>
                                                <Typography
                                                  className={`${classes.xsFontSize} ${classes.allFontWeight} ${classes.attribStyle}`}
                                                >
                                                  {resVar.product_attribute.name}
                                                </Typography>
                                              </Grid>
                                              <Grid item xs={6} sm={8}>
                                                {resVar.product_template_attribute_values.length !==
                                                0 ? (
                                                  <div className={css.elipsisText}>
                                                    {resVar.product_template_attribute_values.map(
                                                      (resVal) => {
                                                        return (
                                                          <span>{`${resVal.attribute_name}, `}</span>
                                                        )
                                                      },
                                                    )}
                                                  </div>
                                                ) : null}
                                              </Grid>
                                            </Grid>
                                          )
                                        })}
                                      </span>
                                    ) : (
                                      <div className={`${css.flex} ${classes.alignCenter}`}>
                                        <Typography className={classes.attribStyle} variant="h6">
                                          Color
                                        </Typography>
                                      </div>
                                    )}
                                  </Container>
                                  {isMobilecreen ? null : (
                                    <Container>
                                      <Grid container spacing={2}>
                                        <Grid item md={3} sm={3}>
                                          <Link
                                            route="detail"
                                            params={{pid: res.id, cat: res.categ_id}}
                                            href
                                          >
                                            <Button variant="contained" color="primary" fullWidth>
                                              <Typography className={css.capitalize}>
                                                Details
                                              </Typography>
                                            </Button>
                                          </Link>
                                        </Grid>
                                        <Grid item md={6} sm={7}>
                                          {cart.some((el) => el.product_id === res.id) ? (
                                            <Button
                                              variant="contained"
                                              fullWidth
                                              className={`${classes.btnOrange}`}
                                              onClick={() => delCart(res.id)}
                                            >
                                              <Typography className={css.capitalize}>
                                                Remove From Inquiry
                                              </Typography>
                                            </Button>
                                          ) : (
                                            <Button
                                              variant="outlined"
                                              fullWidth
                                              color="primary"
                                              onClick={() => addCart(res)}
                                            >
                                              <Typography className={css.capitalize}>
                                                Add To Inquiry
                                              </Typography>
                                            </Button>
                                          )}
                                        </Grid>
                                      </Grid>
                                    </Container>
                                  )}
                                </Grid>
                                {isMobilecreen ? (
                                  <Container>
                                    <Grid container spacing={1}>
                                      <Grid item xs={4}>
                                        <Link
                                          route="detail"
                                          params={{pid: res.id, cat: res.categ_id}}
                                          href
                                        >
                                          <Button
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            size="small"
                                          >
                                            <span className={css.capitalize}>Details</span>
                                          </Button>
                                        </Link>
                                      </Grid>
                                      <Grid item xs={8}>
                                        {cart.some((el) => el.product_id === res.id) ? (
                                          <Button
                                            variant="contained"
                                            fullWidth
                                            style={{paddingLeft: 8, paddingRight: 8}}
                                            className={`${classes.btnOrange}`}
                                            onClick={() => delCart(res.id)}
                                            size="small"
                                          >
                                            <span className={css.capitalize}>
                                              Remove From Inquiry
                                            </span>
                                          </Button>
                                        ) : (
                                          <Button
                                            variant="outlined"
                                            fullWidth
                                            color="primary"
                                            onClick={() => addCart(res)}
                                            size="small"
                                          >
                                            <span className={css.capitalize}>Add To Inquiry</span>
                                          </Button>
                                        )}
                                      </Grid>
                                    </Grid>
                                  </Container>
                                ) : null}
                              </Grid>
                            </Paper>
                          )
                        })}
                    </div>
                    {product === null && (
                      <Paper className={css.boxProduct}>
                        <Grid container spacing={0}>
                          <Grid md={2} sm={3} xs={3}>
                            <Skeleton
                              variant="rect"
                              className={`${classes.imgSize} ${css.responsiveList}`}
                              height={150}
                            />
                          </Grid>
                          <Grid md={10} sm={9} xs={9}>
                            <Container className={classes.marginBottomForm}>
                              <Skeleton variant="text" width={200} height={40} />
                              <div className={`${classes.marginBottomForm} ${css.flex}`}>
                                <Skeleton variant="text" width={50} height={30} />
                              </div>
                              <span>
                                <Grid container className={`${classes.alignCenter}`}>
                                  <Grid item xs={4}>
                                    <Skeleton variant="text" width={60} height={30} />
                                  </Grid>
                                  <Grid item xs={8}>
                                    <Skeleton variant="text" />
                                    <Skeleton variant="text" />
                                  </Grid>
                                </Grid>
                              </span>
                              <span>
                                <Grid container className={`${classes.alignCenter}`}>
                                  <Grid item xs={4}>
                                    <Skeleton variant="text" width={60} height={30} />
                                  </Grid>
                                  <Grid item xs={8}>
                                    <Skeleton variant="text" />
                                    <Skeleton variant="text" />
                                  </Grid>
                                </Grid>
                              </span>
                            </Container>
                            {isMobilecreen ? null : (
                              <Container>
                                <Grid container spacing={2}>
                                  <Grid item md={4} sm={6}>
                                    <Skeleton variant="text" height={50} />
                                  </Grid>
                                  <Grid item md={4} sm={6}>
                                    <Skeleton variant="text" height={50} />
                                  </Grid>
                                </Grid>
                              </Container>
                            )}
                          </Grid>
                          {isMobilecreen ? (
                            <Container>
                              <Grid container spacing={2}>
                                <Grid item xs={4}>
                                  <Skeleton variant="text" height={50} />
                                </Grid>
                                <Grid item xs={8}>
                                  <Skeleton variant="text" height={50} />
                                </Grid>
                              </Grid>
                            </Container>
                          ) : null}
                        </Grid>
                      </Paper>
                    )}
                    <div className={`${classes.center}`}>
                      <div className={`${css.flex} ${css.justifyCenter}`}>
                        {product !== null && product.length === 0 ? (
                          <img
                            src="/images/noProduct.webp"
                            alt="no Product in this Category"
                            width="200"
                          />
                        ) : (
                          <Pagination
                            className={classes.marginTopPerButtonThird}
                            count={pageCount}
                            onChange={handleChangePagination}
                            page={page}
                            variant="outlined"
                            shape="rounded"
                          />
                        )}
                      </div>
                    </div>
                    <DialogCart product={data} bool={notify} closeCart={exitCart} />
                  </div>
                </Grid>
              </Grid>
            </Body>
          </StickyContainer>
        </Container>
      </Container>
      <Footer />
    </div>
  )
}

Product.propTypes = {
  getProduct: PropTypes.func.isRequired,
  getCart: PropTypes.func.isRequired,
  deleteCart: PropTypes.func.isRequired,
  getCategoryDetail: PropTypes.func.isRequired,
  category: PropTypes.shape.isRequired,
  product: PropTypes.shape.isRequired,
  filteredCategory: PropTypes.shape.isRequired,
  addToCart: PropTypes.func.isRequired,
  getProductSorted: PropTypes.func.isRequired,
  closeCart: PropTypes.func.isRequired,
  notify: PropTypes.string.isRequired,
  productLength: PropTypes.string.isRequired,
  pageCount: PropTypes.string.isRequired,
  data: PropTypes.shape.isRequired,
  cart: PropTypes.shape.isRequired,
  setProductNull: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  category: state.product.categoryList,
  product: state.product.product,
  filteredCategory: state.product.filteredCategory,
  notify: state.cart.notify,
  data: state.cart.data,
  cart: state.cart.cart,
  productLength: state.product.productLength,
  pageCount: state.product.pageCount,
})

function MapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getProduct,
      addToCart,
      closeCart,
      getCategoryDetail,
      getCart,
      deleteCart,
      getProductSorted,
      setProductNull,
    },
    dispatch,
  )
}

export default connect(mapStateToProps, MapDispatchToProps)(Product)
