import { Alert, Fade, IconButton } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { ContextType } from '../../@types/ContextTypes'
import AppContext from '../../context/AppContext'
import CloseIcon from '@mui/icons-material/Close'

const Modal = () => {
  const { modalContent, closeModal, modalType, isModalOpen } = useContext(
    AppContext
  ) as ContextType

  useEffect(() => {
    const selfClose = setTimeout(() => closeModal(), 5000)
    return () => clearTimeout(selfClose)
  }, [closeModal])

  return (
    <Fade in={isModalOpen} unmountOnExit>
      <Alert
        severity={modalType}
        sx={{
          position: 'fixed',
          bottom: '1%',
          right: '1%',
          display: 'flex',
          alignItems: 'center'
        }}
        action={
          <IconButton type="button" onClick={closeModal}>
            <CloseIcon color={modalType} />
          </IconButton>
        }
      >
        {modalContent}
      </Alert>
    </Fade>
  )
}

export default Modal
