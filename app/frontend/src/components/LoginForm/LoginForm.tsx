import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userLogin, userRegister } from '../../helpers/userFetch'
import { IUser } from '../../@types/userTypes'
import AppContext from '../../context/AppContext'
import { ContextType } from '../../@types/ContextTypes'
import { IFetchLoginMessage } from '../../@types/taskTypes'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import ListAltIcon from '@mui/icons-material/ListAlt'

const FORM_INITIAL_STATE = {
  username: '',
  password: ''
}

export default function LoginForm() {
  const { openModalWithContent } = useContext(AppContext) as ContextType

  const navigate = useNavigate()
  const [isRegister, setIsRegister] = useState(false)
  const [formData, setFormData] = useState<IUser>(FORM_INITIAL_STATE)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    setFormData((prevState) => ({ ...prevState, [id]: value }))
  }

  const handleRegister = async () => {
    const { message, status } = (await userRegister(
      formData
    )) as IFetchLoginMessage

    if (status === 201 && message !== undefined) {
      openModalWithContent(message, 'success')
      setIsRegister(false)
      setFormData(FORM_INITIAL_STATE)
    } else if (message !== undefined) {
      openModalWithContent(message, 'error')
    }
  }

  const handleLogin = async () => {
    const { message } = (await userLogin(formData)) as IFetchLoginMessage
    if (!message) {
      setFormData(FORM_INITIAL_STATE)
      navigate('/tasks')
    } else {
      openModalWithContent(message, 'error')
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    isRegister ? await handleRegister() : await handleLogin()
  }

  return (
    <Paper
      elevation={2}
      sx={{
        border: '1px solid #42a5f5',
        bgcolor: '#4fc3f7',
        width: { xs: '90%', sm: '40%', md: '30%' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center ',
        py: '50px'
      }}
      component="article"
      onSubmit={handleSubmit}
    >
      <Stack
        spacing={1}
        sx={{
          width: '80%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center '
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', pb: 3 }}>
          <ListAltIcon fontSize="large" color="primary" sx={{ pr: 1 }} />
          <Typography color="primary" variant="h5">
            To do list
          </Typography>
        </Box>
        <TextField
          size="small"
          label="Nome de Usuário"
          variant="standard"
          onChange={handleChange}
          value={formData.username}
          type="username"
          id="username"
          fullWidth
        />
        <TextField
          size="small"
          label="Senha"
          variant="standard"
          onChange={handleChange}
          value={formData.password}
          type="password"
          id="password"
          fullWidth
        />

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          component="section"
        >
          <Button fullWidth type="submit" variant="contained">
            {isRegister ? 'Registrar' : 'Entrar'}
          </Button>
          <Box sx={{ display: 'flex' }}>
            <Typography color="primary" variant="body2">
              {isRegister ? 'Deseja fazer login?' : 'Não tem conta?'}

              <Button
                color="secondary"
                size="small"
                type="button"
                onClick={() => setIsRegister(!isRegister)}
              >
                {isRegister ? 'Login' : 'Cadastre-se'}
              </Button>
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Paper>
  )
}
