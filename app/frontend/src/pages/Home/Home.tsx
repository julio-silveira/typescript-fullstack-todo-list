import { Box } from '@mui/material'
import * as React from 'react'
import { LoginForm } from '../../components/LoginForm'

export default function Home() {
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
    </Box>
  )
}
