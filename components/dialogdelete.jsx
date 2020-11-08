import React from 'react'
import {makeStyles, withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogContent from '@material-ui/core/DialogContent'
import {Typography, Button} from '@material-ui/core'
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
  center: {
    alignSelf: 'center',
    textAlign: 'center',
  },
}))

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

export default function DialogDelete({bool, closeCart: exitCart, deleteFunction: deleteCart}) {
  const classes = useStyles()
  const handleClose = () => {
    exitCart()
  }
  const handleDelete = () => {
    deleteCart()
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
              Are you sure you want to remove this product ?
            </Typography>
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={handleDelete}
              fullWidth
            >
              <Typography variant="h6" className={`${css.capitalize}`}>
                Yes, Delete Seafood
              </Typography>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

DialogDelete.propTypes = {
  bool: PropTypes.bool.isRequired,
  closeCart: PropTypes.func.isRequired,
  deleteFunction: PropTypes.func.isRequired,
}
