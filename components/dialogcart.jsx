import React from 'react'
import {makeStyles, withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Grid from '@material-ui/core/Grid'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import constant from '../constant'
import {Link} from '../routes'
import useFallbackImageInSSR from '../useFallbackImageInSSR'
import css from '../public/style.css'

const useStyles = makeStyles((theme) => ({
  marginDesc: {
    marginLeft: 20,
    marginRight: 20,
    width: '50%',
  },
  center: {
    alignSelf: 'center',
  },
  btnColor: {
    background: '#F37125',
    textTransform: 'capitalize',
  },
  descPrice: {
    marginTop: '35%',
    alignSelf: 'center',
    [theme.breakpoints.down('xs')]: {
      marginTop: '10%',
      fontSize: 15,
    },
  },
  weight: {
    marginLeft: 10,
    [theme.breakpoints.down('xs')]: {
      fontSize: 15,
    },
  },
  name: {
    [theme.breakpoints.down('xs')]: {
      fontSize: 15,
    },
  },
}))

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  textCenter: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
})

const DialogTitle = withStyles(styles)((props) => {
  const {children, classes, onClose, ...other} = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" className={classes.textCenter}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

export default function DialogCart({product, bool, closeCart: exitCart}) {
  const classes = useStyles()
  const handleClose = () => {
    exitCart()
  }
  const prod = product !== null && product !== undefined ? product : {id: 2, name: 'null'}
  const fallbackImageProps = useFallbackImageInSSR('/images/noImages.webp')
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={bool}
    >
      <DialogTitle data-testid="text-success" onClose={handleClose}>
        Successfully added product to inquiry
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item sm={3} xs={3}>
            <img
              src={constant.IMG_URL + prod.id}
              alt={`product produk ${prod.name}`}
              {...fallbackImageProps}
              style={{width: '100%'}}
            />
          </Grid>
          <Grid item sm={6} xs={9}>
            <div className={classes.marginDesc}>
              <Typography variant="h5" className={classes.name}>
                {prod.name}
              </Typography>
              <div className={`${css.flex} ${classes.descPrice}`}>
                <Typography variant="h6" className={`${classes.name} ${css.orange}`}>
                  Rp.
                  {prod.list_price}
                </Typography>
                <Typography variant="h6" className={classes.weight}>
                  / Kg
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item sm={3} className={classes.center} xs={12}>
            <div>
              <Link route="cart" href>
                <Button
                  className={classes.btnColor}
                  variant="contained"
                  color="primary"
                  onClick={handleClose}
                  fullWidth
                >
                  See Inquiry
                </Button>
              </Link>
            </div>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
