import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import {Link} from '../routes'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
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

const ProductCategoryCard = ({res, isTabletScreen, isMobileScreen}) => {
  const classes = useStyles()

  return (
    <Link route="product" params={{id: res.id}} href>
      <Paper data-testid="product-category-card" className={`${classes.paper}`}>
        {(() => {
          if (isTabletScreen) {
            return (
              <img
                src={res.images}
                alt={res.name}
                style={{width: '90%', height: 100}}
                data-testid="product-category-card-image-tablet"
              />
            )
          }
          if (isMobileScreen)
            return (
              <img
                src={res.images}
                alt={res.name}
                style={{width: '80%'}}
                data-testid="product-category-card-image-mobile"
              />
            )
          return (
            <img
              src={res.images}
              alt={res.name}
              style={{width: '100%', height: 200}}
              data-testid="product-category-card-image-desktop"
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
  )
}

export default ProductCategoryCard
