import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Typography} from '@material-ui/core'
import {Link} from '../routes'
import css from '../public/style.css'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginLeft: '2%',
    marginRight: '2%',
    marginTop: '2%',
  },
  breadcrumbsColorFont: {
    color: '#007BFF',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 600,
  },
  separator: {
    height: 20,
    alignSelf: 'center',
    marginLeft: 7,
    marginRight: 7,
  },
}))

export default function Breadcrumbs({category, productName, classProp}) {
  const classes = useStyles()
  const categoryArr = category || [{id: 1, name: 'test'}]
  return (
    <div className={classProp}>
      <div className={css.flex}>
        <Link route="/" href>
          <Typography className={`${classes.breadcrumbsColorFont} ${css.clickAble}`}>
            Home
          </Typography>
        </Link>
        <img className={classes.separator} src="/images/separator.png" alt="separator" />
        <Link route="/" href>
          <Typography className={`${classes.breadcrumbsColorFont} ${css.clickAble}`}>
            All Category
          </Typography>
        </Link>
        <img
          data-testid="img-separator"
          className={classes.separator}
          src="/images/separator.png"
          alt="separator"
        />
        {productName ? (
          <Link
            route="product"
            params={{id: categoryArr.length > 0 ? categoryArr[0].id : 'load'}}
            href
          >
            <Typography className={`${classes.breadcrumbsColorFont} ${css.clickAble}`}>
              {categoryArr.length > 0 ? categoryArr[0].name : 'load'}
            </Typography>
          </Link>
        ) : (
          <Typography color="textPrimary">{categoryArr ? categoryArr[0].name : 'load'}</Typography>
        )}
        {productName && (
          <span className={css.flex}>
            <img className={classes.separator} src="/images/separator.png" alt="separator" />
            <Typography color="textPrimary">{productName}</Typography>
          </span>
        )}
      </div>
    </div>
  )
}
