import React, {useEffect, useRef} from 'react'
import {connect, useDispatch} from 'react-redux'
import {makeStyles, useTheme} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Badge from '@material-ui/core/Badge'
import {getCart} from '../store/actions/cartAction'
import {Link} from '../routes'
import css from '../public/style.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  capitalize: {
    textTransform: 'capitalize',
    color: '#FFFFFF',
  },
  imgWidth: {
    [theme.breakpoints.down('xs')]: {
      width: 120,
    },
  },
  smDownContainer: {
    padding: 0,
    margin: 0,
  },
  iconCart: {
    color: '#FFFFFF',
    marginRight: 5,
    [theme.breakpoints.down('xs')]: {
      color: '#F37125',
    },
  },
}))

function ElevationScroll(props) {
  const {children, window} = props
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}

function getUnique(arr, index) {
  const unique = arr
    .map((e) => e[index])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter((e) => arr[e])
    .map((e) => arr[e])
  return unique
}

function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const Header = ({cart}) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const theme = useTheme()
  const prevCart = usePrevious(cart)
  useEffect(() => {
    async function fetchCart() {
      await dispatch(getCart())
    }
    if (prevCart !== cart) {
      fetchCart()
    }
  }, [])
  const carts = cart !== null && cart !== undefined ? cart : []
  const cartData = getUnique(carts, 'product_id')
  const isTabletScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('xs'))
  return (
    <div className={classes.root}>
      <ElevationScroll>
        <AppBar color="default" data-testid="header">
          <Container className={isTabletScreen ? classes.smDownContainer : null}>
            <Container className={isTabletScreen ? classes.smDownContainer : null}>
              <Toolbar>
                <Link route="/" href>
                  <div className={`${classes.title}`}>
                    <img
                      className={`${css.clickAble} ${classes.imgWidth}`}
                      src="/images/logo.png"
                      alt="aruna logo"
                    />
                  </div>
                </Link>
                <Link route="cart" href>
                  <Badge color="secondary" badgeContent={cartData.length}>
                    {isMobileScreen ? (
                      <ShoppingCartIcon
                        fontSize="large"
                        className={`${css.clickAble} ${classes.iconCart}`}
                      />
                    ) : (
                      <Button className={`${css.bgorange} ${css.alignEnd}`} variant="contained">
                        <ShoppingCartIcon fontSize="small" className={classes.iconCart} />
                        <span className={classes.capitalize}>Your Inquiry</span>
                      </Button>
                    )}
                  </Badge>
                </Link>
              </Toolbar>
            </Container>
          </Container>
        </AppBar>
      </ElevationScroll>
    </div>
  )
}

const mapStateToProps = (state) => ({
  cart: state?.cart?.cart || null,
})

export default connect(mapStateToProps)(Header)
