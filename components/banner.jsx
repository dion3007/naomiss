import React from 'react'
import {makeStyles, useTheme} from '@material-ui/core/styles'
import {Typography, Container} from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Breadcrumbs from './breadcrumbs'
import css from '../public/style.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 55,
  },
  smDownContainer: {
    padding: 0,
    margin: 0,
  },
  fullWidth: {
    width: '100%',
  },
  titleOnImage: {
    position: 'absolute',
    top: 120,
    color: '#FFFFFF',
    [theme.breakpoints.down('sm')]: {
      fontSize: 25,
      top: 100,
    },
    [theme.breakpoints.down('xs')]: {
      top: 80,
      fontSize: 20,
    },
  },
}))

export default function Banner({banner, title, filteredCategory}) {
  const classes = useStyles()
  const theme = useTheme()
  const isTabletScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('xs'))
  return (
    <div className={classes.root}>
      <img className={classes.fullWidth} src={banner} alt="banner" />
      <Container className={isTabletScreen ? classes.smDownContainer : null}>
        <Container>
          <Typography variant="h3" className={`${classes.titleOnImage}`}>
            {title}
          </Typography>
          {title !== ' ' && (
            <>
              {isMobileScreen ? null : (
                <Breadcrumbs category={filteredCategory} classProp={css.breadcrumbsDiv} />
              )}
            </>
          )}
        </Container>
      </Container>
    </div>
  )
}

Banner.defaultProps = {
  title: ' ',
}
