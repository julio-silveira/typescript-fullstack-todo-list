import { Box } from '@mui/material'
import React, { useContext } from 'react'
import { ContextType } from '../../@types/ContextTypes'
import { LoginForm } from '../../components/LoginForm'
import { Modal } from '../../components/Modal'
import AppContext from '../../context/AppContext'

export default function Home() {
  const { isModalOpen } = useContext(AppContext) as ContextType
  return (
    <Box
      component="main"
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <LoginForm />
      {isModalOpen && <Modal />}
    </Box>
  )
}
