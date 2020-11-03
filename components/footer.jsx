import React from 'react'
import {makeStyles, useTheme} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import {Typography} from '@material-ui/core'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import InstagramIcon from '@material-ui/icons/Instagram'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Divider from '@material-ui/core/Divider'
import {Link} from '../routes'
import css from '../public/style.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 15,
  },
  smDownContainer: {
    padding: 0,
    margin: 0,
  },
  imgWidth: {
    [theme.breakpoints.down('xs')]: {
      width: 50,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  titleFooter: {
    flexGrow: 1,
    textAlign: 'center',
  },
  textArunaFooter: {
    width: '60%',
    [theme.breakpoints.down('sm')]: {
      width: '60%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginTop: 15,
    },
  },
  textBold: {
    fontWeight: 'bold',
    color: '#0B63AA',
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },
  toolbarBottom: {
    marginRight: '4%',
    marginLeft: '4%',
    justifyContent: 'space-between',
  },
  alignCenter: {
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      alignItems: 'baseline',
    },
  },
  alwaysFlex: {
    display: 'flex',
  },
  marginUpAndDown: {
    marginTop: 15,
    marginBottom: 15,
  },
  marginTitleDown: {
    marginBottom: 15,
    [theme.breakpoints.down('xs')]: {
      marginTop: 15,
    },
  },
  imgLogo: {
    marginRight: 10,
    width: '10%',
    [theme.breakpoints.down('sm')]: {
      width: 158,
    },
    [theme.breakpoints.down('xs')]: {
      width: 120,
    },
  },
  linkFooter: {
    color: '#545454',
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
}))

export default function Footer() {
  const classes = useStyles()
  const theme = useTheme()

  const isTabletScreen = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Container className={isTabletScreen ? classes.smDownContainer : null}>
          <Container className={isTabletScreen ? classes.smDownContainer : null}>
            <Toolbar>
              <Link route="/" href>
                <div className={classes.title}>
                  <img
                    data-testid="aruna-logo"
                    className={`${css.clickAble} ${classes.imgLogo}`}
                    src="/images/logo.png"
                    alt="logo aruna"
                  />
                  <img
                    className={`${css.clickAble} ${classes.imgWidth}`}
                    src="/images/Footer/LUS.png"
                    alt="Laut Untuk Semua"
                  />
                </div>
              </Link>
            </Toolbar>
            <Container>
              <Grid container>
                <Grid item sm={6} xs={12} md={6}>
                  <div className={classes.textArunaFooter}>
                    <Typography variant="caption">
                      Aruna Is A Fisheries E-Commerce Platform Focused On Helping To Develop Coastal
                      Economy By Creating A Fair And Transparent Fisheries Trade Through Technology
                      Innovation.
                    </Typography>
                  </div>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Grid container>
                    <Grid item sm={4} xs={12}>
                      <div className="gridFooterMargin">
                        <Typography
                          variant="h6"
                          className={`${classes.textBold} ${classes.marginTitleDown}`}
                        >
                          Company
                        </Typography>
                        <a href="https://aruna.id/tentang-aruna/">
                          <Typography
                            className={`${classes.linkFooter} ${css.clickAble}`}
                            variant="h6"
                          >
                            About Us
                          </Typography>
                        </a>
                      </div>
                    </Grid>
                    <Grid item sm={4} xs={12}>
                      <div className="gridFooterMargin">
                        <Typography
                          variant="h6"
                          className={`${classes.textBold} ${classes.marginTitleDown}`}
                        >
                          Help
                        </Typography>
                        <a href="https://aruna.id/contact/">
                          <Typography
                            className={`${classes.linkFooter} ${css.clickAble}`}
                            variant="h6"
                          >
                            Contact Us
                          </Typography>
                        </a>
                      </div>
                    </Grid>
                    <Grid item sm={4} xs={12}>
                      <div className="gridFooterMargin">
                        <Typography
                          variant="h6"
                          className={`${classes.textBold} ${classes.marginTitleDown}`}
                        >
                          Social
                        </Typography>
                        <a
                          data-testid="facebook-link"
                          href="https://www.facebook.com/arunaindonesia/"
                        >
                          <div
                            className={`${classes.alwaysFlex} ${classes.alignCenter} ${css.clickAble}`}
                          >
                            <FacebookIcon className={classes.linkFooter} />
                            <Typography variant="h6" className={classes.linkFooter}>
                              Facebook
                            </Typography>
                          </div>
                        </a>
                        <a data-testid="twitter-link" href="https://twitter.com/arunaindonesia">
                          <div
                            className={`${classes.alwaysFlex} ${classes.alignCenter} ${css.clickAble}`}
                          >
                            <TwitterIcon className={classes.linkFooter} />
                            <Typography variant="h6" className={classes.linkFooter}>
                              Twitter
                            </Typography>
                          </div>
                        </a>
                        <a
                          data-testid="instagram-link"
                          href="https://www.instagram.com/aruna.indonesia"
                        >
                          <div
                            className={`${classes.alwaysFlex} ${classes.alignCenter} ${css.clickAble}`}
                          >
                            <InstagramIcon className={classes.linkFooter} />
                            <Typography variant="h6" className={classes.linkFooter}>
                              Instagram
                            </Typography>
                          </div>
                        </a>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </Container>
          <Divider variant="middle" className={classes.marginUpAndDown} />
          <Toolbar>
            <Typography
              variant="caption"
              className={`${css.responsiveTextAlignCenter} ${classes.title}`}
            >
              © 2020 Aruna. All rights reserved.
            </Typography>
            <Typography variant="caption" className={`${css.hide} ${classes.titleFooter}`}>
              info@aruna.id
            </Typography>
            <Typography variant="caption" className={`${css.hide} ${classes.titleFooter}`}>
              (021) 2787 1384
            </Typography>
            <Typography variant="caption" className={`${css.hide} ${classes.titleFooter}`}>
              AD Premiere, Jakarta Selatan
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}
