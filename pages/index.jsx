import React from 'react'
import Head from 'next/head'
import {connect} from 'react-redux'
import {makeStyles, useTheme} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import PropTypes from 'prop-types'
import {Link} from '../routes'
import Header from '../components/header'
import Banner from '../components/banner'
import Featured from '../components/featured'
import Body from '../components/body'
import Footer from '../components/footer'
import css from '../public/style.css'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  title: {
    marginBottom: 34,
    fontWeight: 600,
    [theme.breakpoints.down('xs')]: {
      fontSize: 18,
    },
  },
  smDownContainer: {
    padding: 0,
    margin: 0,
  },
  categoryTitle: {
    fontWeight: 'bold',
    color: '#000000',
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 14,
    },
  },
}))

const Index = ({category}) => {
  const classes = useStyles()
  const theme = useTheme()

  const categoryFilter = category.result.filter((res) => {
    return res.flag === true
  })
  const isTabletScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('xs'))
  return (
    <>
      <Head>
        <title>Buyer Apps Aruna - Your Seafood Market</title>
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
        <Banner banner="/banner/banner.webp" />
        <Body className={isTabletScreen ? classes.smDownContainer : null}>
          <Container className={isTabletScreen ? classes.smDownContainer : null}>
            <Typography variant="h5" className={`${classes.title}`}>
              Product Categories
            </Typography>
            <Grid container spacing={isTabletScreen ? 1 : 2}>
              {categoryFilter &&
                categoryFilter.map((res) => {
                  return (
                    <Grid item md={3} sm={3} xs={4} key={res.id} className={css.clickAble}>
                      <Link route="product" params={{id: res.id}} href>
                        <Paper className={`${classes.paper}`}>
                          {(() => {
                            if (isTabletScreen) {
                              return (
                                <img
                                  src={res.images}
                                  alt={res.name}
                                  style={{width: '90%', height: 100}}
                                />
                              )
                            }
                            if (isMobileScreen)
                              return <img src={res.images} alt={res.name} style={{width: '80%'}} />
                            return (
                              <img
                                src={res.images}
                                alt={res.name}
                                style={{width: '100%', height: 200}}
                              />
                            )
                          })()}
                          <div>
                            <Typography variant="h5" className={classes.categoryTitle}>
                              {res.name}
                            </Typography>
                          </div>
                        </Paper>
                      </Link>
                    </Grid>
                  )
                })}
            </Grid>
            <Typography
              variant="h6"
              style={{
                color: '#006BB0',
                marginTop: 51,
                marginBottom: 51,
                textAlign: 'center',
                fontWeight: 600,
              }}
            >
              as seen on
            </Typography>
            <Featured />
          </Container>
        </Body>
      </Container>
      <Footer />
    </>
  )
}

Index.propTypes = {
  category: PropTypes.shape.isRequired,
}

const mapStateToProps = (state) => ({category: state.product.category})

export default connect(mapStateToProps)(Index)
