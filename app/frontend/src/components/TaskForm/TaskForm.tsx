import { Box, IconButton, Paper, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { ContextType } from '../../@types/ContextTypes'
import { ITaskState } from '../../@types/taskTypes'
import { IFetchLoginMessage } from '../../@types/userTypes'
import AppContext from '../../context/AppContext'
import { saveTask } from '../../helpers/taskFetch'
import SendIcon from '@mui/icons-material/Send'
import LogoutIcon from '@mui/icons-material/Logout'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import { useNavigate } from 'react-router-dom'
import { clearLocalStorage } from '../../helpers/localStorage'

const TaskForm: React.FC = () => {
  const { updateTasks, openModalWithContent } = useContext(
    AppContext
  ) as ContextType
  const navigate = useNavigate()
  const [taskData, setTaskData] = useState<ITaskState>({
    status: false,
    description: ''
  })

  const handleLogout = () => {
    clearLocalStorage()
    navigate('/')
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    setTaskData((prevState) => ({ ...prevState, [id]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const { message } = (await saveTask(taskData)) as IFetchLoginMessage
    updateTasks()
    if (message !== undefined) {
      openModalWithContent(message, 'success')
    }
  }
  return (
    <Paper
      elevation={2}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        pb: 3,
        mb: 1,
        bgcolor: '#e3f2fd'
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Box
        sx={{
          py: 2,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <FormatListBulletedIcon
          sx={{ px: 2 }}
          fontSize="large"
          color="primary"
        />
        <Typography color="primary" variant="h4">
          To do list
        </Typography>

        <Box sx={{ display: 'flex', px: 2 }}>
          <IconButton onClick={handleLogout}>
            <LogoutIcon color="primary" />
          </IconButton>
        </Box>
      </Box>
      <Box>
        <TextField
          color="primary"
          variant="filled"
          size="small"
          onChange={handleChange}
          id="description"
          label="Adicionar Tarefa"
        />
        <IconButton type="submit">
          <SendIcon color="primary" />
        </IconButton>
      </Box>
    </Paper>
  )
}

export default TaskForm
