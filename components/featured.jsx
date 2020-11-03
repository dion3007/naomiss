import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Zoom from '@material-ui/core/Zoom'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 60,
  },
  images: {
    width: '100%',
  },
}))

export default function Featured() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={3}>
        <Zoom in style={{transitionDelay: '400ms'}}>
          <Grid item xs={4} sm={3} md={2}>
            <img
              className={classes.images}
              data-testid="image1"
              alt="feature 1"
              src="/stack/image1.png"
            />
          </Grid>
        </Zoom>
        <Zoom in style={{transitionDelay: '500ms'}}>
          <Grid item xs={4} sm={3} md={2}>
            <img
              className={classes.images}
              data-testid="image2"
              alt="feature 2"
              src="/stack/image2.png"
            />
          </Grid>
        </Zoom>
        <Zoom in style={{transitionDelay: '600ms'}}>
          <Grid item xs={4} sm={3} md={2}>
            <img
              className={classes.images}
              data-testid="image3"
              alt="feature 3"
              src="/stack/image3.png"
            />
          </Grid>
        </Zoom>
        <Zoom in style={{transitionDelay: '700ms'}}>
          <Grid item xs={4} sm={3} md={2}>
            <img
              className={classes.images}
              data-testid="image4"
              alt="feature 4"
              src="/stack/image4.png"
            />
          </Grid>
        </Zoom>
        <Zoom in style={{transitionDelay: '800ms'}}>
          <Grid item xs={4} sm={3} md={2}>
            <img
              className={classes.images}
              data-testid="image5"
              alt="feature 5"
              src="/stack/image5.png"
            />
          </Grid>
        </Zoom>
        <Zoom in style={{transitionDelay: '900ms'}}>
          <Grid item xs={4} sm={3} md={2}>
            <img
              className={classes.images}
              data-testid="image6"
              alt="feature 6"
              src="/stack/image6.png"
            />
          </Grid>
        </Zoom>
      </Grid>
    </div>
  )
}
