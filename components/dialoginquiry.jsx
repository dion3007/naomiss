import React from 'react'
import {makeStyles, withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogContent from '@material-ui/core/DialogContent'
import {Typography, Button} from '@material-ui/core'
import {Link} from '../routes'
import css from '../public/style.css'

const useStyles = makeStyles(() => ({
  marginDesc: {
    marginLeft: 20,
    marginRight: 20,
    width: '50%',
  },
  marginBottom: {
    marginBottom: 20,
  },
  btnColor: {
    backgroundColor: 'transparent',
  },
  center: {
    alignSelf: 'center',
    textAlign: 'center',
  },
  bold: {
    fontWeight: 700,
  },
}))

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

export default function DialogInquiry({text, email, bool, closeCart: exitCart}) {
  const classes = useStyles()
  const handleClose = () => {
    exitCart()
  }
  return (
    <>
      <Dialog
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        data-testid="dialog"
        aria-labelledby="customized-dialog-title"
        open={bool}
      >
        <DialogContent>
          <div className={classes.center}>
            <Typography className={classes.marginBottom}>
              {`${text} `}
              <span className={classes.bold}>{email}</span>
            </Typography>
            <Typography>We will contact you within 1x24 hours on workdays.</Typography>
            <Link route="/" href>
              <Button className={classes.btnColor} onClick={handleClose} fullWidth>
                <Typography variant="h6" className={`${css.orange} ${css.capitalize}`}>
                  Back to Product Category
                </Typography>
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

DialogInquiry.propTypes = {
  text: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  bool: PropTypes.bool.isRequired,
  closeCart: PropTypes.func.isRequired,
}
