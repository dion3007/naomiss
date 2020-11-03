import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Container} from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '2%',
  },
}))

export default function Body({children}) {
  const classes = useStyles()

  return (
    <Container className={classes.root} data-testid="body">
      {children}
    </Container>
  )
}
